const mongoose = require("mongoose");
const categorySchema = require("../schema/categorySchema");

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
