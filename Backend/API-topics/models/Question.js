var mongoose = require("mongoose");

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
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
