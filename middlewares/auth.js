import jwt from "jsonwebtoken";

const checkAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No JWT provided" });
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("Invalid token");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(498).json({ message: "Token validation failed" });
    }
    req.user = decoded;
    req.timeOfRequest = Date.now();
    next();
  });
};

export default checkAuth;
