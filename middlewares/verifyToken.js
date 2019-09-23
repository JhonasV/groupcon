const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    let jwtToken = token.split(" ");
    const verified = jwt.verify(jwtToken[1], keys.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};
