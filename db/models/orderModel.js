const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    products: Array,
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: {
      type: String,
      required: [true, "Phone Is Required"],
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", schema);
