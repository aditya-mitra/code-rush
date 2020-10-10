import instance from './instance';

export async function runCode(source, compiler, useremail, input) {
    const data = await instance.post("code/run",
        {
            source, compiler, useremail, input
        })
        .then(response => response.data)
        .catch(error => {
            /* error with internet connection may only occur here
             * all other errors are handled 
             * and recieved as data from the backend
             */
            return { message: "Please check your internet connection and try again" };
        });

    return data;
}

export async function submitCode(source, compiler, useremail, qid) {
    const data = await instance.post("code/submit",
        {
            source, compiler, useremail, qid
        })
        .then(response => response.data)
        .catch(error => {
            return { message: "Please check your internet connection and try again" };
        });

    return data;
}