const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
});

module.exports = categorySchema;
