import mongoose from "mongoose";

import productModel from "../models/product.js";

export const getAllProducts = (req, res, next) => {
  productModel
    .find()
    .where("hidden")
    .ne(true)
    .select("_id name price")
    .sort("-updatedAt")
    .exec()
    .then((products) =>
      res.status(200).json({
        count: products.length,
        products: products,
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

export const getProductById = (req, res, next) => {
  const id = req.params.id;
  productModel
    .findById(id)
    .where("hidden")
    .ne(true)
    .select("_id name price createdAt updatedAt")
    .exec()
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: "No valid entry for provided id",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

export const createProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const product = new productModel({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    price: price,
  });
  product
    .save()
    .then((result) =>
      res.status(201).json({
        _id: result._id,
        name: result.name,
        price: result.price,
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const updateProductById = (req, res, next) => {
  const id = req.params.id;
  const updatedProduct = {};
  for (const key of req.body) {
    updatedProduct[key.propName] = key.value;
  }
  productModel
    .findByIdAndUpdate(id, { $set: updatedProduct })
    .exec()
    .then(() => {
      productModel
        .findById(id)
        .select("_id name price createdAt updatedAt")
        .exec()
        .then((product) => res.status(200).json(product))
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};

export const hideProductById = (req, res, next) => {
  const id = req.params.id;
  productModel
    .findByIdAndUpdate(id, { $set: { hidden: true } })
    .exec()
    .then(() =>
      res.status(200).json({
        message: "Deleted successfully",
      })
    )
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    });
};
