const mongoose = require("mongoose");
const productSchema = require("../schema/productSchema");

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
