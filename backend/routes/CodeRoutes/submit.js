const {Router} = require('express');
const router = Router();

var db = require("../../models");
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
    const useremail = req.body.useremail;
    const qid = req.body.qid;
    
    // const {input} = req.body; // CHANGE THIS, [GET THE INPUT FROM THE QUESTION MODEL] no input in submission, get the input from the questioninput

    const submissionId = await sphere.post('/submissions',
    {
        source,
        compilerId,
        input
    })
    .then(response=>response.data)
    .then(data=>data.id)
    .catch(err=>next(err));

    let answer = null; 
    while(true){
        const sub = await sphere.get(`/submissions/${submissionId}`)
                                    .then(response=>response.data)
                                    .catch(err=>next(err))
        if(sub.executing) continue;

        const {streams} = sub.result;
        if(streams.cmpinfo){ // 'code' provided by the client has error
            const {uri} = streams.cmpinfo;
            answer = await sphere.get(uri)
                                .then(response=>response.data)
                                .catch(err=>next(err))
        }else{ // we have an output!
            const {uri} = streams.output;
            answer = await sphere.get(uri)
                                .then(response=>response.data)
                                .catch(err=>next(err))

        }
        break;
    }

    let isCorrect = true; // check this with the answers db
    const question_id = await db.Question.findOne({Q_id:qid})
                                        .catch(e=>next(e))

    if(!isCorrect){
        res.json({"message":"incorrect answer"})
    }else{
        
        const givePoint = async () => {
            const user = await db.User.findOne({email:useremail})
                                .catch(e=>next(e));
            if(!user) res.json({"message":"User not logged in!"});

            const beenSolving = await db.Solved.findOne({userid:user._id})
            if(!beenSolving){
                // user has solved his first question
                const newSolved = new db.Solved({userid:user._id, qid:[question_id], points:10}) // new entry
                newSolved.save();
            }else{
                // user has been solving questions. So, we just add push that one
                beenSolving.qid.push(question_id);
                beenSolving.points += 10;
                beenSolving.save();
            }
        }

        givePoint();
    }
    
})

module.exports = router;