const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  loginUser,
  userCount,
  deleteUser,
  deleteUserById,
  deleteAllUser,
} = require("../controller/userController");
const router = express.Router();

router.route("/users").get(getAllUsers).delete(deleteAllUser);
router.route("/users/auth/login").post(loginUser);
router.route("/users/auth/register").post(createUser);
router.route("/users/:id").get(getUserById).delete(deleteUserById);
router.route("/users/get/count").get(userCount);

module.exports = router;
