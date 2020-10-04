var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
  category: String,
});

var Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
