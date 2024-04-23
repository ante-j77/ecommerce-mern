const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
          min: [1],
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    basketTotal: {
      type: Number,
      required: true,
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Basket", basketSchema);
