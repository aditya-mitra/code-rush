import dynamic from 'next/dynamic';

import Layout from '../../components/layout';
import Editor from '../../components/Editor';
import Comment from '../../components/Comments';
const Question = dynamic(() => import('../../components/Question'), { ssr: false });

import { getAllQuestionPaths, getQuestion } from '../../lib/questions';

export async function getStaticPaths() {
    const paths = await getAllQuestionPaths();
    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps(ctx){
    const { qid } = ctx.params;

    const question = await getQuestion(qid);
    const comments = [...question.comments];
    delete question['comments'];
    
    return {
        props: { question, qid, comments },
        revalidate: 30 * 60, // in seconds
    }
}

function Qid(props) {
    return (
        <div>
            <Question question={props.question}/>
            <Editor qid={props.qid} />
            <Comment comments={props.comments} />
        </div>
    );
}


export default Layout(Qid);