import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    hidden: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Products", productSchema);

export default productModel;
