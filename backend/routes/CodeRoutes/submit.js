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
    
    const question = await db.Question.findOne({Q_id:qid})
                            .catch(e=>next(e))
    const input = question.Q_input || "";

    const submissionId = await sphere.post('/submissions',
    {
        source,
        compilerId,
        input,
    })
    .then(response=>response.data)
    .then(data=>data.id)
    .catch(err=>next(err));

    let output = null; 
    while(true){
        const sub = await sphere.get(`/submissions/${submissionId}`)
                                    .then(response=>response.data)
                                    .catch(err=>next(err))
        if(sub.executing) continue;

        const {streams} = sub.result;
        if(streams.cmpinfo){ // 'code' provided by the client has error
            const {uri} = streams.cmpinfo;
            output = await sphere.get(uri)
                                .then(response=>response.data)
                                .catch(err=>next(err))
        }else{ // we have an output!
            const {uri} = streams.output;
            output = await sphere.get(uri)
                                .then(response=>response.data)
                                .catch(err=>next(err))

        }
        break;
    }


    let isCorrect = false; // check this with the answers db


    const answer = await db.Answer.findOne({A_id:qid})
                                .catch(e=>next(e))           
                                       
    if(output.trim() == answer.A_output.trim()){
        isCorrect = true;
    }

                                        
    if(!isCorrect){
        res.json({"message":"incorrect answer"})
    }else{
        const question_id = question._id;
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
                const hasAlreadySolved = beenSolving.qid.find(e=>JSON.stringify(e)===JSON.stringify(question_id));

                if(hasAlreadySolved)
                    return res.json({"message":"Correct Answer!\nYou have already solved that"});

                beenSolving.qid.push(question_id);
                beenSolving.points += 10;
                beenSolving.save();
            }
        }

        await givePoint();
        try{
            res.json({"message":"Correct Answer!"})
        }catch(e){
            console.log("Had already solved")
            return;
        }
    }
    
})

module.exports = router;