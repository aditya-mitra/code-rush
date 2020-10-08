var mongoose = require("mongoose");

var AnswerSchema = new mongoose.Schema({
    A_id: Number,
    A_input: [
        {
            type: String
        }
    ],
    A_output: [
        {
            type: String
        }
    ],
});

var Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
