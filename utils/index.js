const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    console.log(token);
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
    next();
  } catch (e) {
    res.status(401).send({ message: "Invalid token" });
  }
};

module.exports = checkToken;
