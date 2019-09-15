const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
module.exports = function(req, res, next) {
  const token = req.header("auth-token");
  console.log(token);
  if (!token) return res.status("401").send("Access Denied");

  try {
    const verified = jwt.verify(token, keys.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).send("Invalid token");
  }
};
