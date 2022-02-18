import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
      immutable: true,
    },
    quantity: { type: Number, default: 1 },
    cancelled: { type: Boolean, default: false },
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
orderSchema.statics.getAllOrders = function (cb) {
  return Orders.find()
    .omitCancelled()
    .selectFieldsGrouped()
    .populateProduct()
    .exec();
};

orderSchema.statics.getOrderById = function (id, cb) {
  return Orders.findById(id).selectFieldsSingle().populateProduct().exec();
};

orderSchema.statics.createOrder = function (productId, quantity, cb) {
  const newOrder = new Orders({
    _id: new mongoose.Types.ObjectId(),
    product: productId,
    quantity: quantity,
  });
  return newOrder.save();
};

orderSchema.methods.updateOrder = async function (dict, cb) {
  const updatedOrder = {};
  for (const pair of dict) {
    updatedOrder[pair.key] = pair.value;
  }
  await this.set(updatedOrder).save();
  return this;
};

orderSchema.methods.cancelOrder = async function (cb) {
  const cancelDict = [
    {
      key: "cancelled",
      value: true,
    },
  ];
  return await this.updateOrder(cancelDict);
};

orderSchema.query.omitCancelled = function () {
  return this.where("cancelled").ne(true);
};

orderSchema.query.selectFieldsGrouped = function () {
  return this.select("_id product quantity cancelled");
};

orderSchema.query.selectFieldsSingle = function () {
  return this.select(" product quantity cancelled createdAt updatedAt");
};

orderSchema.query.populateProduct = function () {
  return this.populate("product", "_id name price updatedAt");
};

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;
