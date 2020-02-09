const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  type: String,
  title: String,
  author: String,
  price: Number,
  image: Array
});

module.exports = mongoose.model("book", bookSchema);
