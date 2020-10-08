var mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
    Q_id: Number,
    Q_title: String,
    Q_description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;