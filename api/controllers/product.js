import Products from "../models/product.js";

export const getAllProducts = (req, res, next) => {
  Products.getAllProducts()
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
  Products.getProductById(id)
    .then((product) => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({
          message: "Product not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const createProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  Products.createProduct(name, price)
    .then((product) => {
      res.status(201).json({
        _id: product._id,
        name: product.name,
        price: product.price,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const updateProductById = (req, res, next) => {
  const id = req.params.id;
  const dict = req.body;
  Products.getProductById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      } else {
        product
          .updateProduct(dict)
          .then((updatedProduct) => {
            res.status(200).json(updatedProduct);
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const hideProductById = (req, res, next) => {
  const id = req.params.id;
  Products.getProductById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      } else {
        product
          .softDelete()
          .then(() => {
            res.status(200).json({
              message: "Deleted successfully",
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json({
              error: error,
            });
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
