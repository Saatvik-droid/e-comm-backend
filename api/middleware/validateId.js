import mongoose from "mongoose";
const { isValidObjectId } = mongoose;

export default (req, res, next) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    return res.status(404).json({
      message: "Resource not found",
    });
  }
  next();
};
