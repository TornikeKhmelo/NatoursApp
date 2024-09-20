const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    // unique: true,
    // trim: true,
    // maxlength: [40, "A tour name must have less or equal then 40 characters"],
    // minlength: [10, "A tour name must have more or equal then 10 characters"],
  },
  slug: String,
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
    mingLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm a password"],
    mingLength: 8,
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

// document middleware runs only save and create
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  // has the Password cost 12
  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
