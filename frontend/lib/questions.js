import axios from 'axios'

let storedQuestions = null; // later uplift this to the store

async function fetchAllQuestions(){
    const data = await axios.get("http://localhost:9000/api/questions/")
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
    console.log("we have paths as", paths)
    return paths;

}

export async function getAllQuestions(){
    let questions = null;
    if(storedQuestions)
        questions = storedQuestions;
    else
        questions = await fetchAllQuestions();

    questions = questions.map(question=>{
        return {
            question
        }
    })

    return questions;
}

export async function getQuestion(qid){
    const question = await axios.get(`http://localhost:9000/api/questions/${qid}`)
        .then(response=>response.data)
        .catch(err=>{
            console.log("Error while getting that question", qid, err);
        })
    if(!question) return null;
    return question;
}