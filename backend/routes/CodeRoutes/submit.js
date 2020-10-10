const { Router } = require("express");
const router = Router();

var db = require("../../models");
const sphere = require("./sphere");

const langs = {
    c: 11,
    cpp: 1,
    java: 10,
    nodejs: 56,
    python: 116,
    ruby: 17,
};

router.post("/", async function (req, res, next) {
    const source = req.body.source;
    const compilerId = langs[req.body.compiler];
    const useremail = req.body.useremail;
    const qid = req.body.qid;

    const answer = await db.Answer.findOne({ A_id: qid }).lean().catch((e) => next(e));

    const testCases = answer.A_input.length;
    for (let i = 0; i < testCases; i++) {
        const input = answer.A_input[i] || "";

        const submissionId = await sphere
            .post("/submissions", {
                source,
                compilerId,
                input,
            })
            .then((response) => response.data)
            .then((data) => data.id)
            .catch(error => {
                const err = { data: error.response.data, status: error.response.status };
                next(err);
            });

        let output = null;
        while (true) {
            const sub = await sphere
                .get(`/submissions/${submissionId}`)
                .then((response) => response.data)
                .catch((err) => next(err));

            if (sub.executing) {
                const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));
                await sleep();
                continue;
            }

            const { streams } = sub.result;
            if (streams.cmpinfo) {
                // 'code' provided by the client has error
                const { uri } = streams.cmpinfo;
                output = await sphere
                    .get(uri)
                    .then((response) => response.data)
                    .catch((err) => next(err));
                return res.json({ message: "Compilation Failed!\nPlease first run and check your code" });
            } else {
                // we have an output!
                const { uri } = streams.output;
                output = await sphere
                    .get(uri)
                    .then((response) => response.data)
                    .catch((err) => next(err));
            }
            break; // break out of while loop
        }

        output = output + ''; // convert to string
        if (output.trim() == answer.A_output[i].trim()) {
            continue; // continue to check the next input's output
        } else {
            const message = `Failed after test case ${i+1} of ${testCases} test cases`;
            return res.json({ message: message });
        }

    }

    /* if reached here,
     * implies that all testcases are passes and we are ready to give point
     */

    const question = await db.Question.findOne({ Q_id: qid }).catch((e) => next(e));
    const question_id = question._id;

    const givePoint = async () => {

        const user = await db.User.findOne({ email: useremail }).catch((e) => next(e));
        const beenSolving = await db.Solved.findOne({ userid: user._id });
        if (!beenSolving) {
            // user has solved his first question
            const newSolved = new db.Solved({
                userid: user._id,
                qid: [question_id],
                points: (10 * testCases),
            }); // new entry
            newSolved.save();
        } else {
            // user has been solving questions. So, we just push this one
            const hasAlreadySolved = beenSolving.qid.find(
                (e) => JSON.stringify(e) === JSON.stringify(question_id)
            );

            if (hasAlreadySolved) {
                return res.json({ message: "Correct Answer!\nBut, you have already solved this" });
            } else {
                beenSolving.qid.push(question_id);
                beenSolving.points += (10 * testCases);
                beenSolving.save();
            }
        }

    };

    await givePoint();

    try {
        res.json({ message: "Correct Answer!\nSaved" });
    } catch (e) {
        res.json({ message: "Something went wrong while submitting your answer" });
        return;
    }

});

module.exports = router;