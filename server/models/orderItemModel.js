const { default: mongoose } = require("mongoose");
const orderItemSchema = require("../schema/orderItemSchema");

const orderItemModel = mongoose.model("OrderItem", orderItemSchema);

module.exports = orderItemModel;
