import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import Editor from '../../components/Editor';
import Comment from '../../components/Comments';
const Question = dynamic(() => import('../../components/Question'), { ssr: false });

import { getAllQuestionPaths, getQuestion } from '../../lib/questions';

export async function getStaticPaths() {
    const paths = await getAllQuestionPaths();
    return {
        paths,
        fallback: true
    };
}

export async function getStaticProps(ctx){
    const { qid } = ctx.params;

    const question = await getQuestion(qid);
    const comments = [...question.comments];
    delete question['comments'];
    
    return {
        props: { 
            question, qid, comments 
        },
        revalidate: 1, // in seconds
    }
}

function Qid(props) {
    const router = useRouter();

    if (router.isFallback) { // for page not generated during build, wait for getStaticProps to finish
        return <div>Fetching a fresh new question </div>;
    } else if (props.question && props.qid && props.comments) { // page has the static props
        return (
            <div>
                <Question question={props.question} />
                <Editor qid={props.qid} />
                <Comment comments={props.comments} />
            </div>
        );
    } else {
        router.push('/404');
        return null;
    }
}


export default Layout(Qid);