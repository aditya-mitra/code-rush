var mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  C_author: {
    type: String,
    required: "Name cannot be blank",
  },
  C_text: String,
  C_date: {
    type: Date,
    default: Date.now,
  },
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
