const { default: mongoose } = require("mongoose");
const orderSchema = require("../schema/orderSchema");

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
