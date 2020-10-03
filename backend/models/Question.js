var mongoose = require("mongoose");
var c

var QuestionSchema = new mongoose.Schema({
  Q_id: Number,
  Q_title: String,
  Q_input: String,
  Q_description: [
    {
      type: String,
    },
  ],
  answer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
