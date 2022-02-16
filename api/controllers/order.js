import mongoose from "mongoose";

import orderModel from "../models/order.js";
import productModel from "../models/product.js";

export const getAllOrders = (req, res, next) => {
  orderModel
    .find()
    .where("cancelled")
    .ne(true)
    .select("id product quantity")
    .populate("product", "_id name price")
    .limit(5)
    .exec()
    .then((result) => {
      res.status(200).json({
        count: result.length,
        orders: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getOrderById = (req, res, next) => {
  const id = req.params.id;
  orderModel
    .findById(id)
    .select("_id product quantity createdAt updatedAt")
    .populate("product", "_id name price")
    .exec()
    .then((order) => {
      res.status(200).json(order);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const createOrder = (req, res, next) => {
  const { productId, quantity } = req.body;
  productModel
    .findById(productId)
    .where("hidden")
    .ne(true)
    .select("_id name price")
    .exec()
    .then((product) => {
      if (!product)
        return res.status(404).json({
          message: "Product not found",
        });
      const order = new orderModel({
        _id: new mongoose.Types.ObjectId(),
        product: productId,
        quantity: quantity,
      });
      order
        .save()
        .then((result) => {
          res.status(201).json({
            _id: result._id,
            product: product,
            quantity: result.quantity,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const updateOrderById = (req, res, next) => {
  const id = req.params.id;
  const updatedOrder = {};
  for (const key of req.body) {
    updatedOrder[key.propName] = key.value;
  }
  orderModel
    .findByIdAndUpdate(id, { $set: updatedOrder })
    .exec()
    .then(() => {
      orderModel
        .findById(id)
        .select("_id product quantity createdAt updatedAt")
        .populate("product", "_id name price")
        .exec()
        .then((product) => res.status(200).json(product));
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

export const cancelOrderById = (req, res, next) => {
  orderModel
    .findByIdAndUpdate(req.params.id, { $set: { cancelled: true } })
    .exec()
    .then(() =>
      res.status(200).json({
        message: "Deleted successfully",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
