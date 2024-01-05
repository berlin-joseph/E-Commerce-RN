const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  verified: { type: Boolean, default: false },
  verificationToken: { type: String },
  address: {
    apartment: { type: String, default: "" },
    street: { type: String, default: "" },
    city: { type: String, default: "" },
    country: { type: String, default: "" },
    zipCode: { type: String, default: "" },
  },
});

module.exports = userSchema;
