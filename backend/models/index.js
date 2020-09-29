var mongoose = require("mongoose");
mongoose.set("debug", true);

mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useFindAndModify: false },
  () => {
    console.log("DB started!");
  }
);

mongoose.Promise = Promise;

module.exports.Answer = require("./Answer");
module.exports.Question = require("./Question");
module.exports.User = require("./User");
module.exports.Solved = require("./Solved");
