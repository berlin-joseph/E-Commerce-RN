const express = require("express");
const {
  createProduct,
  getProducts,
  deleteAllProducts,
  getProductById,
  updateProductsById,
  deleteProductsById,
  getProductCount,
  getFeatured,
} = require("../controller/productsController");

const router = express.Router();

//products route
router
  .route("/products")
  .get(getProducts)
  .post(createProduct)
  .delete(deleteAllProducts);

router.route("/products/count").get(getProductCount);
router.route("/products/featured").get(getFeatured);
router.route("/products/featured/:count").get(getFeatured);

router
  .route("/products/:id")
  .get(getProductById)
  .put(updateProductsById)
  .delete(deleteProductsById);

module.exports = router;
