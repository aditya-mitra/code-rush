const {Router} = require('express');
const router = Router();

const sphere = require('./sphere');


const langs={
    'c':11,
    'cpp':1,
    'java':10,
    'nodejs':56,
    'python':116,
    'ruby':17
}


router.post('/', async function(req,res, next){

    const source = req.body.source;
    const compilerId = langs[req.body.compiler];
    const useremail = req.body.useremail; // use this for giving point to the user
    
    const {input} = req.body; // CHANGE THIS, [GET THE INPUT FROM THE QUESTION MODEL] no input in submission, get the input from the questioninput

    const submissionId = await sphere.post('/submissions',
    {
        source,
        compilerId,
        input
    })
    .then(response=>response.data)
    .then(data=>data.id)
    .catch(err=>next(err));

    let clientInfo = null; 
    while(true){
        const sub = await sphere.get(`/submissions/${submissionId}`)
                                    .then(response=>response.data)
                                    .catch(err=>next(err))
        if(sub.executing) continue;

        // console.log(sub.result);
        const {streams} = sub.result;
        if(streams.cmpinfo){ // 'code' provided by the client has error
            const {uri} = streams.cmpinfo;
            clientInfo = await sphere.get(uri)
                                    .then(response=>response.data)
                                    .catch(err=>next(err))
        }else{ // we have an output!
            const {uri} = streams.output;
            clientInfo = await sphere.get(uri)
                                    .then(response=>response.data)
                                    .catch(err=>next(err))
            
            // check the output with the answer of the db
            // else say did not receive the correct answer

            // if matched then give him the point
        }
        break;
    }

    res.send({'info':'submitted'}); // change this message accordingly
    
})

module.exports = router;