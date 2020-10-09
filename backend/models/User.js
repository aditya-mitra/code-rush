var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var User = mongoose.model("User", new Schema({}), "users");

module.exports = User;