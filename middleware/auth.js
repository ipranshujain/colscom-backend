import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      status: false,
      message: "A token is required for authentication",
      direct: "login",
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(403).json({
      status: false,
      message: "Invalid token",
      direct: "login",
    });
  }
  return next();
};

export default verifyToken;
