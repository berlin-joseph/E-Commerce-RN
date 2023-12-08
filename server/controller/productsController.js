const categoryModel = require("../models/CategoryModel");
const Product = require("../models/productModel");

// create products - /api/v1/products
exports.createProduct = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.body.category);

    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    const product = new Product({
      name: req.body.name,
      image: req.body.image,
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

    const products = await savedProduct.populate("category");

    if (!products) {
      return res
        .status(400)
        .send({ success: false, message: "Product can not be created" });
    }

    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      data: savedProduct,
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
    const category = await categoryModel.findById(req.body.category);
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    }

    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        image: req.body.image,
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
