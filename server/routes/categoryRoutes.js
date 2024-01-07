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
 router.route("/category/delete").delete(deleteCategory);

 router
   .route("/category/:id")
   .get(getCategoryById)
   .put(updateCategoryById)
   .delete(deleteCategoryById);

module.exports = router;
