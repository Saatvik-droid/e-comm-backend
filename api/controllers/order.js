import Orders from "../models/order.js";
import Products from "../models/product.js";

export const getAllOrders = (req, res, next) => {
  Orders.getAllOrders()
    .then((orders) => {
      res.status(200).json({
        count: orders.length,
        orders: orders,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getOrderById = (req, res, next) => {
  const id = req.params.id;
  Orders.getOrderById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      } else {
        res.status(200).json(order);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const createOrder = (req, res, next) => {
  const { productId, quantity } = req.body;
  Products.getProductById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      } else {
        Orders.createOrder(productId, quantity)
          .then((order) => {
            res.status(201).json({
              _id: order._id,
              product: product,
              quantity: order.quantity,
            });
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

export const updateOrderById = async (req, res, next) => {
  const id = req.params.id;
  const dict = req.body;
  Orders.getOrderById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      } else {
        order
          .updateOrder(dict)
          .then((updatedOrder) => {
            res.status(200).json(updatedOrder);
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

export const cancelOrderById = (req, res, next) => {
  const id = req.params.id;
  Orders.getOrderById(id)
    .then((order) => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      } else {
        order
          .cancelOrder()
          .then(() => {
            res.status(200).json({
              message: "Cancelled successfully",
            });
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
