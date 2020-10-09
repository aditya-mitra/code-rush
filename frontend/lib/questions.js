import axios from 'axios';
import marked from 'marked';

let storedQuestions = null;

async function fetchAllQuestions(){
    const data = await axios.get(process.env.BACKEND_URL+"questions")
                            .then(response=>response.data)
                            .catch(e=>{
                                console.log("Error while fetching questions",e)
                            })
    if(!data) return null;
    storedQuestions = data;
    return data;
}

export async function getAllQuestionPaths(){
    let questions = null;
    if(storedQuestions)
        questions = storedQuestions;
    else
        questions = await fetchAllQuestions();


    let paths = questions.map(question=>{
        return {
            params:{
                qid:JSON.stringify(question.Q_id)
            }
        }
    })
    return paths;

}

export async function getAllQuestions(){
    let questions = null;
    if(storedQuestions)
        questions = storedQuestions;
    else
        questions = await fetchAllQuestions();

    return questions;
}

export async function getQuestion(qid){
    const question = await axios.get(`${process.env.BACKEND_URL}questions/${qid}`)
        .then(response => {
            return response.data
        })
        .then(q => {
            q.Q_description = q.Q_description.replace(/<br>/g, " <br/> ");
            q.Q_description = marked(q.Q_description);
            return q;
        })
        .catch(err=>{
            console.log("Error while getting that question", qid, err);
        })
    if(!question) return null;
    return question;
}