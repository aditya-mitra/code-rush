import dynamic from 'next/dynamic';

import Layout from '../../components/layout'

import Editor from '../../components/Editor'
const Question = dynamic(()=>import('../../components/Question'), {ssr:false});

function Qid() {

    return (
        <div>
            <Question/>
            <Editor/>
        </div>
    );
}

export default Layout(Qid);