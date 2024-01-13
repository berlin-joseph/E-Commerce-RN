const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  image: { type: String },
  navigation: { type: String },
});

module.exports = categorySchema;
