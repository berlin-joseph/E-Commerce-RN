const express = require("express");
const {
  createOrder,
  getAllOrders,
  getAllOrdersById,
  updateOrdersById,
  deleteOrdersById,
  totalSale,
  totalOrderCount,
} = require("../controller/orderController");
const router = express.Router();

router.route("/order").get(getAllOrders).post(createOrder);
router.route("/order/totalSale").get(totalSale);
router.route("/order/totalSaleCount").get(totalOrderCount);
router
  .route("/order/:id")
  .get(getAllOrdersById)
  .put(updateOrdersById)
  .delete(deleteOrdersById);

module.exports = router;
