const express = require("express");
const {
  createOrder,
  getAllOrders,
  getAllOrdersById,
  updateOrdersById,
  deleteOrdersById,
} = require("../controller/orderController");
const router = express.Router();

router.route("/order").get(getAllOrders).post(createOrder);
router
  .route("/order/:id")
  .get(getAllOrdersById)
  .put(updateOrdersById)
  .delete(deleteOrdersById);

module.exports = router;
