import mongoose from "mongoose";
const { isValidObjectId } = mongoose;
import { validate as validateEmail } from "email-validator";

export const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!id || !isValidObjectId(id)) {
    return res.status(404).json({
      message: "Resource not found",
    });
  }
  next();
};

export const validateEmailAndPassword = (req, res, next) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;
  if (!email || !plaintextPassword || !validateEmail(email)) {
    return res.status(400).json({
      message: "Email or password not found",
    });
  }
  next();
};

export const validateUsername = (req, res, next) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({
      message: "Username not found",
    });
  }
  next();
};
