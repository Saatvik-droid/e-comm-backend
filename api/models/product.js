import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

/*
// Do not declare statics using ES6 arrow functions (=>).
// Arrow functions explicitly prevent binding `this`.
// https://mongoosejs.com/docs/guide.html#statics
*/
productSchema.statics.getProductById = function (id, cb) {
  return Products.findById(id).omitDeleted().selectFieldsSingle().exec();
};

productSchema.statics.getAllProducts = function (cb) {
  return Products.find()
    .omitDeleted()
    .selectFieldsGrouped()
    .sort("-updatedAt")
    .exec();
};

productSchema.statics.createProduct = function (name, price, cb) {
  const newProduct = new Products({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    price: price,
  });
  return newProduct.save();
};

productSchema.statics.updateProductById = function (id, dict) {
  const updatedProduct = {};
  for (const pair of dict) {
    updatedProduct[pair.key] = pair.value;
  }
  return Products.findByIdAndUpdate(id, { $set: updatedProduct }).exec();
};

productSchema.statics.softDeleteById = function (id, cb) {
  const deleteDict = [
    {
      key: "deleted",
      value: true,
    },
  ];
  return Products.updateProductById(id, deleteDict);
};

productSchema.query.omitDeleted = function () {
  return this.where("deleted").ne(true);
};

productSchema.query.selectFieldsGrouped = function () {
  return this.select("_id name price");
};

productSchema.query.selectFieldsSingle = function () {
  return this.select("_id name price createdAt updatedAt");
};

const Products = mongoose.model("Products", productSchema);

export default Products;
