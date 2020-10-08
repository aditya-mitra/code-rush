const { Router } = require("express");
const router = Router();

const sphere = require("./sphere");

const langs = {
    c: 11,
    cpp: 1,
    java: 10,
    javascript: 56,
    python: 116,
    ruby: 17,
};

router.post("/", async function (req, res, next) {
    const source = req.body.source;
    const compilerId = langs[req.body.compiler];
    const input = req.body.input ? req.body.input : "";

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

    let clientInfo = null;
    while (true) {
        const sub = await sphere
            .get(`/submissions/${submissionId}`)
            .then((response) => response.data)
            .catch((err) => next(err));
        if (sub.executing) continue;

        // console.log(sub.result);
        const { streams } = sub.result;
        if (streams.cmpinfo) {
            // 'code' provided by the client has error
            const { uri } = streams.cmpinfo;
            clientInfo = await sphere
                .get(uri)
                .then((response) => response.data)
                .catch((err) => next(err));
        } else {
            // we have an output!
            const { uri } = streams.output;
            clientInfo = await sphere
                .get(uri)
                .then((response) => response.data)
                .catch((err) => next(err));
        }
        break;
    }
    res.json(clientInfo);
});

module.exports = router;
