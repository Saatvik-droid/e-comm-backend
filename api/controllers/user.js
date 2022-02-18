import Users from "../models/user.js";

export const getUserById = (req, res, next) => {
  const id = req.params.id;
  Users.getUserById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      } else {
        res.status(200).json({
          _id: user._id,
          username: user.username,
          deleted: user.deleted,
          createdAt: user.createdAt,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

export const getUserByUsername = (req, res, next) => {
  const username = req.params.username;
  Users.getUserByUsername(username).then((user) => {
    res.status(200).json({
      id: user._id,
      username: user.username,
      deleted: user.deleted,
      createdAt: user.createdAt,
    });
  });
};

export const userSignUp = (req, res, next) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;
  const username = req.body.username;
  Users.getUserByEmail(email)
    .then((user) => {
      if (user) {
        return res.status(401).json({
          message: "Authorization failed",
        });
      } else {
        Users.generateHashedPassword(plaintextPassword)
          .then((hashedPassword) => {
            Users.signUp(email, hashedPassword, username).then((user) => {
              res.status(201).json({
                message: "User created successfully",
              });
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

export const userSignIn = (req, res, next) => {
  const email = req.body.email;
  const plaintextPassword = req.body.password;
  Users.getUserByEmail(email).then((user) => {
    if (!user) {
      return res.status(401).json({
        message: "Autharization failed",
      });
    } else {
      user
        .comparePassword(plaintextPassword)
        .then((result) => {
          if (!result) {
            return res.status(401).json({
              message: "Autharization failed",
            });
          } else {
            const token = user.generateJWT();
            res.status(200).json({
              message: "Autharization successfull",
              id: user._id,
              token: token,
            });
            if (user.deleted) {
              user.undoDeletion();
            }
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    }
  });
};

export const userDelete = (req, res, next) => {
  const id = req.params.id;
  Users.getUserById(id).then((user) => {
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      user
        .softDelete()
        .then((user) => {
          res.status(200).json({
            message: "User deleted successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    }
  });
};
