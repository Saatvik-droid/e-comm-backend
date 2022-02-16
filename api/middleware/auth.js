import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      req.userData = decoded;
      next();
    } else {
      return res.status(401).json({
        message: "Autharization failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Autharization failed",
    });
  }
};
