const express = require("express");
const {
  getCategory,
  createCategory,
  deleteCategory,
  deleteCategoryById,
  getCategoryById,
  updateCategoryById,
} = require("../controller/categoryController");
const router = express.Router();

router
  .route("/category")
  .get(getCategory)
  .post(createCategory)
  .delete(deleteCategory);

router
  .route("/category/:id")
  .delete(deleteCategoryById)
  .get(getCategoryById)
  .put(updateCategoryById);

module.exports = router;
