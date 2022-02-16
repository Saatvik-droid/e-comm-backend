import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/user.js";

export const userSignUp = (req, res, next) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;

  userModel
    .find({ email: email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        bcrypt
          .hash(plaintextPassword, 10)
          .then((hashedPassword) => {
            const user = new userModel({
              _id: new mongoose.Types.ObjectId(),
              email: email,
              password: hashedPassword,
            });
            user
              .save()
              .then((user) => {
                res.status(200).json({
                  message: "User signed up successfully",
                });
              })
              .catch((error) => {
                console.log(error);
                return res.status(500).json(error);
              });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
};

export const userSignIn = (req, res, next) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;
  userModel
    .findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Autharization failed",
        });
      }
      bcrypt
        .compare(plaintextPassword, user.password)
        .then((result) => {
          const jwtToken = jwt.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          res.status(200).json({
            message: "Autharization successfull",
            token: jwtToken,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.status(401).json({
            message: "Autharization failed",
          });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const userDelete = (req, res, next) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
