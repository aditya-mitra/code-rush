import axios from 'axios';

async function postComment(name, text, qid) {
    const data = await axios.post(process.env.BACKEND_URL + `comments/${qid}`,
        {
            C_author: name,
            C_text: text
        })
        .then(response => response.data)
        .catch(e => {
            console.log("comment could not be posted", e);
        })
    if (!data) return null;
    else return data;
}

export async function postUserComment(name, text, qid) {
    const comment = await postComment(name, text, qid);
    return comment;
}