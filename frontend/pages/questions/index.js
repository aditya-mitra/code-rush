import Layout from '../../components/layout'
import AllQuestions from '../../components/AllQuestions'

import { getAllQuestions } from '../../lib/questions';
import { getCategory } from '../../lib/categories';


export async function getServerSideProps(ctx) {

    if (Object.entries(ctx.query).length === 0) { // get all questions
        const questions = await getAllQuestions();
        return {
            props: { questions },
        }
    } else { // get questions by category
        const questions = await getCategory(ctx.query.cname);
        return {
            props: { questions },
        }
    }

}

function AllQuestionsPage(props) {
    return <AllQuestions questions={props.questions}/>
}

export default Layout(AllQuestionsPage);