const { default: mongoose } = require("mongoose");
const categoryModel = require("../models/CategoryModel");
const Product = require("../models/productModel");
const multer = require("multer");

// Multer middleware setup
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

//creating products -
exports.createProduct = async (req, res) => {
  try {
    //multer middleware
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ success: false, message: "File upload error" });
      } else if (err) {
        return res.status(400).send({ success: false, message: err.message });
      }

      //finding category
      const category = await categoryModel.findById(req.body.category);

      if (!category) {
        return res
          .status(404)
          .send({ success: false, message: "Category not found" });
      }

      const file = req.file;
      if (!file) {
        return res
          .status(404)
          .send({ success: false, message: "image not found" });
      }

      const imageName = req.file.filename;
      const basePath = `${req.protocol}://${req.get(
        "host"
      )}/public/uploads/Products`;

      const product = new Product({
        name: req.body.name,
        image: `${basePath}/${imageName}`,
        description: req.body.description,
        richDescription: req.body.richDescription,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        StockCount: req.body.StockCount,
        ratings: req.body.ratings,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      });

      const savedProduct = await product.save();

      if (!savedProduct) {
        return res
          .status(400)
          .send({ success: false, message: "Product can not be created" });
      }

      return res.status(201).send({
        success: true,
        message: "Product created successfully",
        data: savedProduct,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};

// get products - /api/v1/products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    if (!products) {
      return res.status(404).send({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
};

// get product by id - /api/v1/products/:id
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "No product found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product retrieved successfully",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve product",
      error: error.message,
    });
  }
};

// update product by id - /api/v1/products/:id
exports.updateProductsById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid product Id" });
    }

    // Multer middleware for handling file upload
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
      }

      const category = await categoryModel.findById(req.body.category);
      if (!category) {
        return res
          .status(404)
          .send({ success: false, message: "Category not found" });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .send({ success: false, message: "Product not found" });
      }

      const file = req.file;
      let imagePath;
      if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;
        imagePath = `${basePath}/${fileName}`;
      } else {
        imagePath = product.image;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          image: imagePath,
          description: req.body.description,
          richDescription: req.body.richDescription,
          brand: req.body.brand,
          price: req.body.price,
          category: req.body.category,
          StockCount: req.body.StockCount,
          ratings: req.body.ratings,
          numReviews: req.body.numReviews,
          isFeatured: req.body.isFeatured,
        },
        { new: true, runValidators: true }
      );

      if (!updatedProduct) {
        return res
          .status(404)
          .send({ success: false, message: "Product Not Updated" });
      }

      return res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        data: updatedProduct,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

// delete products by id - /api/v1/products/:id
exports.deleteProductsById = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .send({ message: "Product not found or not deleted" });
    } else {
      return res.status(200).send({ message: "Product deleted successfully" });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

// delete all products - /api/v1/products
exports.deleteAllProducts = async (req, res) => {
  try {
    const result = await Product.deleteMany();

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No products to delete" });
    }

    return res.status(200).send({
      success: true,
      message: "Products Deleted Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete products",
      error: error.message,
    });
  }
};

//product count - api/v1/products/count
exports.getProductCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (productCount === 0) {
      return res.status(400).send({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product count retrieved",
      count: productCount,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve product count",
      error: error.message,
    });
  }
};

//featured products -
exports.getFeatured = async (req, res) => {
  try {
    const product = await Product.find({ isFeatured: true });
    if (!product) {
      return res
        .status(400)
        .send({ success: true, message: "no product fount" });
    }
    return res.status(200).send({
      success: true,
      message: "featured product fount",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve product count",
      error: error.message,
    });
  }
};

//featured products count -
exports.getFeatured = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const product = await Product.find({ isFeatured: true }).limit(count);
    if (!product) {
      return res
        .status(400)
        .send({ success: true, message: "no product fount" });
    }
    return res.status(200).send({
      success: true,
      message: "featured product fount",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve product count",
      error: error.message,
    });
  }
};

exports.imageCollection = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid product Id" });
    }

    // Missing multer configuration for file uploads
    upload.array("images", 10)(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res
          .status(400)
          .send({ success: false, message: "File upload error" });
      } else if (err) {
        return res
          .status(500)
          .send({ success: false, message: "An unknown error occurred" });
      }

      const files = req.files; // Use req.files instead of req.file for arrays of files
      let imagePath = [];

      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      if (files) {
        files.map((file) => {
          imagePath.push(`${basePath}${file.filename}`); // Use file.filename instead of file.fileName
        });
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: imagePath,
        },
        { new: true, runValidators: true }
      );
      if (!product) {
        return res
          .status(404)
          .send({ success: false, message: "Product Not Updated" });
      }

      return res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        data: product,
      });
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve product count",
      error: error.message,
    });
  }
};
