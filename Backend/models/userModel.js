const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    select: false,
  },
  fullName: String,
  phoneNumber: String,
});

userSchema.methods.correctPassword = async (
  candidatePassword,
  userPassword
) => {
  return bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
