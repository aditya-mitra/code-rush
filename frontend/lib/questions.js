import instance from './instance';
import marked from 'marked';


let storedQuestions = null;

async function fetchAllQuestions(){
    const data = await instance.get("questions")
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
    const question = await instance.get(`questions/${qid}`)
        .then(response => {
            return response.data
        })
        .then(q => {
            q.Q_description = marked(q.Q_description);
            return q;
        })
        .catch(err=>{
            console.log("Error while getting that question", qid, err);
        })
    if(!question) return null;
    return question;
}