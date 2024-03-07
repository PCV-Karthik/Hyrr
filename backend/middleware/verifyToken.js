const jwt = require("jsonwebtoken");
const tryCatch = require("../utils/tryCatch");

const verifyToken = tryCatch((req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) throw new Error("You are not authenticated!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) throw new Error("Token is not valid!");
    req.user = user;
    next();
  });
});

module.exports = verifyToken;
