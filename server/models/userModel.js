const { default: mongoose } = require("mongoose");
const userSchema = require("../schema/userSchems");

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
