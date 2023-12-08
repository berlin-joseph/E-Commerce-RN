const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create user - /api/v1/users
exports.createUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res
        .status(400)
        .send({ success: true, message: "User Already available" });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin,
        address: {
          apartment: req.body.address.apartment,
          street: req.body.address.street,
          city: req.body.address.city,
          country: req.body.address.country,
          zipCode: req.body.address.zipCode,
        },
      });

      const newUser = await user.save();

      return res.status(201).send({
        success: true,
        message: "user created successfully",
        user: newUser,
      });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "user not created" });
  }
};

//get all users - /api/v1/users
exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    if (!user) {
      return res
        .status(400)
        .send({ success: true, message: "user list not available" });
    }
    return res
      .status(200)
      .send({ success: true, message: "user list available", list: user });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "User list not found" });
  }
};

//get user by id -/api/v1/users/:id
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res
        .status(400)
        .send({ success: true, message: "user not available in this ID" });
    }
    return res
      .status(200)
      .send({ success: true, message: "user available", user: user });
  } catch (error) {
    return res.status(500).send({ success: false, message: "User not found" });
  }
};

//login user -
exports.loginUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      return res
        .status(400)
        .send({ success: true, message: "user not available " });
    } else {
      const password = bcrypt.compareSync(
        req.body.password,
        userExist.password
      );
      if (!password) {
        return res
          .status(401)
          .send({ success: false, message: "Invalid password" });
      } else {
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign(
          {
            userId: userExist.id,
            isAdmin: userExist.isAdmin,
          },
          secret
        );
        return res.status(200).send({
          success: true,
          message: "user logged In",
          user: userExist.email,
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//user count
exports.userCount = async (req, res) => {
  try {
    const user = await User.countDocuments();

    if (!user) {
      return res
        .status(400)
        .send({ status: true, success: false, message: "user not found" });
    }
    return res.status(200).send({ status: true, success: true, count: user });
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, success: false, message: error.message });
  }
};

//delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res
        .status(400)
        .send({ status: true, success: false, message: "user not available" });
    }
    return res.status(200).send({
      status: true,
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: false, success: false, message: error.message });
  }
};

// delete all products - /api/v1/products
exports.deleteAllUser = async (req, res) => {
  try {
    const user = await User.deleteMany();

    if (user.deletedCount === 0) {
      return res
        .status(404)
        .send({ success: false, message: "No user to delete" });
    }

    return res.status(200).send({
      success: true,
      message: "user Deleted Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
