import dynamic from 'next/dynamic';

import Layout from '../../components/layout'
import Editor from '../../components/Editor'
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
    
    return {
        props: { question, qid },
        revalidate: 60 * 60,
    }
}

function Qid(props) {
    return (
        <div>
            <Question question={props.question}/>
            <Editor qid={props.qid}/>
        </div>
    );
}


export default Layout(Qid);