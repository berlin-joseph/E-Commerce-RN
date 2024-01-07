const multer = require("multer");
const Category = require("../models/CategoryModel");

// Multer middleware setup
// ...
const fileType = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = fileType[file.mimetype];
    let uploadError = new Error("Invalid Upload Format");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = fileType[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

//create category - api/v1/category
exports.createCategory = async (req, res) => {
  try {
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ success: false, message: "File upload error" });
      } else if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }

      const imageName = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;

      const category = new Category({
        name: req.body.name,
        image: `${basePath}/${imageName}`,
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
    });
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
        .send({ success: false, message: "Category delete failed" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete Category",
      error: error.message,
    });
  }
};