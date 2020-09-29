//Schema
const mongoose = require("mongoose");

const sqSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //from User.js
  },
  qid: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question", //from Question.js
    },
  ],
  points: {
    type: Number,
    default: 0.0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// export model solvedquestion with sqSchema
var solvedquestion = mongoose.model("solvedquestion", sqSchema);
module.exports = solvedquestion;
