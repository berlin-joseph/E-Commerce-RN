const express = require("express");
const {
  createOrder,
  getAllOrders,
  getAllOrdersById,
} = require("../controller/orderController");
const router = express.Router();

router.route("/order").get(getAllOrders).post(createOrder);
router.route("/order/:id").get(getAllOrdersById);

module.exports = router;
