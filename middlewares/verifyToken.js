const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
module.exports = function(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, keys.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
