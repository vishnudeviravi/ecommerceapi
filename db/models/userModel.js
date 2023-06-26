const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name"],
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: 8,
      // select: false,
    },
    // confirmPassword: {
    //   type: String,
    //   required: [true, "Please provide a password"],
    //   trim: true,
    //   minlength: 8,
    //   select: false,
    //   validate: {
    //     validator: function (el) {
    //       return el === this.password;
    //     },
    //     message: "Passwords are not same",
    //   },
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
