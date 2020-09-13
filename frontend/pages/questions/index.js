import Layout from '../../components/layout'
import AllQuestions from '../../components/AllQuestions'

import {getAllQuestions} from '../../lib/questions'

export async function getStaticProps(){
    const questions = await getAllQuestions();
    return {
        props:{questions}
    }
}

function AllQuestionsPage(props){
    return <AllQuestions questions={props.questions}/>
}

export default Layout(AllQuestionsPage);