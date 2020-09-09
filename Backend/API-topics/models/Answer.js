var mongoose = require("mongoose");

var AnswerSchema = new mongoose.Schema({
  A_id: Number,
  A_output: String,
  _id: Object,
});

var Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;
