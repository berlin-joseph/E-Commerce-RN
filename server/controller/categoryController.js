const Category = require("../models/CategoryModel");

//create category - api/v1/category
exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      icon: req.body.icon,
    });

    const savedCategory = await category.save();
    if (savedCategory) {
      return res.status(201).send({
        success: true,
        message: "Category Created Successfully",
        data: savedCategory,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Failed to create Category",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Category not created",
      error: error.message,
    });
  }
};

//get category - api/v1/category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length == 0) {
      return res
        .status(500)
        .send({ success: false, message: "Category not available" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Category available", data: category });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Category not found",
      error: error.message,
    });
  }
};

//get category by id - api/v1/category/:id
exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (category.length == 0) {
      return res
        .status(500)
        .send({ success: false, message: "Category not available" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Category available", data: category });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Category not found",
      error: error.message,
    });
  }
};

//update category by id - api/v1/category/:id
exports.updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (category.length == 0) {
      return res
        .status(500)
        .send({ success: false, message: "Category not updated" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Category updated", data: category });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Category not found",
      error: error.message,
    });
  }
};

//delete All category - api/v1/category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.deleteMany({});

    if (category.length > 0) {
      return res.status(200).send({
        success: true,
        message: "Category Deleted Successfully",
        data: category,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Category Empty",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to Delete Category",
      error: error.message,
    });
  }
};

//delete category by id - api/v1/category/:id
exports.deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndRemove(id);
    if (category) {
      return res
        .status(201)
        .send({ success: true, message: "Category deleted successfully" });
    } else {
      return res
        .status(500)
        .send({ success: false, message: "Category deletion failed" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete Category",
      error: error.message,
    });
  }
};
