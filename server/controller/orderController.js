const orderItemModel = require("../models/orderItemModel");
const orderModel = require("../models/orderModel");

exports.createOrder = async (req, res) => {
  try {
    const orderItems = req.body.orderItems;
    const orderItemsId = await Promise.all(
      orderItems.map(async (orderItem) => {
        const createdOrderItem = await orderItemModel.create({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        return createdOrderItem._id;
      })
    );

    const totalPrices = await Promise.all(
      orderItemsId.map(async (orderItemId) => {
        const orderItem = await orderItemModel
          .findById(orderItemId)
          .populate("product", "price")
          .exec();

        const price = orderItem.product.price * orderItem.quantity;
        return price;
      })
    );

    const totalPrice = totalPrices.reduce((acc, curr) => acc + curr, 0);

    const order = await orderModel.create({
      orderItems: orderItemsId,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      Phone: req.body.Phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
      dateOfOrder: Date.now(),
    });

    // console.log(order, "order value");

    if (!order) {
      return res.status(400).send({
        status: true,
        success: false,
        message: "order is empty",
      });
    } else {
      return res.status(201).send({
        status: true,
        success: true,
        message: "order created successfully",
        data: order,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ status: false, success: false, message: "order not created" });
  }
};

//get order details
exports.getAllOrders = async (req, res) => {
  try {
    const order = await orderModel.find().populate("user", "name");

    if (!order) {
      return res.status(404).json({
        status: false,
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      status: true,
      success: true,
      message: "All orders retrieved successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      success: false,
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

//get order details By Id
exports.getAllOrdersById = async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "name")
      .populate({
        path: "orderItems",
        populate: { path: "product", populate: "category" },
      });

    if (!order) {
      return res.status(404).json({
        status: false,
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      status: true,
      success: true,
      message: "All orders retrieved successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      success: false,
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

//update order status By Id
exports.updateOrdersById = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        status: false,
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      status: true,
      success: true,
      message: "All orders updated successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      success: false,
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

//delete order By Id
exports.deleteOrdersById = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndRemove(req.params.id);

    if (order) {
      for (const orderItem of order.orderItems) {
        await orderItemModel.findByIdAndRemove(orderItem);
      }
      return res
        .status(200)
        .json({ success: true, message: "The order is deleted!" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Order not found!" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

//get total sale
exports.totalSale = async (req, res) => {
  try {
    const order = await orderModel.aggregate([
      { $group: { _id: null, totalSale: { $sum: "$totalPrice" } } },
    ]);

    if (order) {
      return res
        .status(200)
        .send({ success: true, status: true, totalSale: order });
    }
    return res
      .status(400)
      .send({ success: true, status: true, message: "not found" });
  } catch (error) {
    return res.status(500).json({ success: false, error: err.message });
  }
};


//get total order count
exports.totalOrderCount = async(req,res)=>{
try {
    const order = await orderModel.countDocuments();

    if (order) {
      return res
        .status(201)
        .send({ status: true, success: true, count: order });
    }
} catch (error) {
   return res.status(500).json({ success: false, error: err.message });
}
}