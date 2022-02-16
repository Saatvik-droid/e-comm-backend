import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    quantity: { type: Number, default: 1 },
    cancelled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Orders", orderSchema);

export default orderModel;
