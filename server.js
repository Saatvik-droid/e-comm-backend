import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import "dotenv/config";

import productRoutes from "./api/routes/product.js";
import ordersRoutes from "./api/routes/order.js";
import userRoutes from "./api/routes/user.js";
import auth from "./api/middleware/auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use("/products", productRoutes);
app.use("/orders", auth, ordersRoutes);
app.use("/users", userRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
  })
  .catch((error) => console.log(error));
