const { default: mongoose } = require("mongoose");
const orderItemSchema = require("../schema/orderItemSchema");

const orderItem = mongoose.model("OrderItem", orderItemSchema);

module.exports = orderItem;
