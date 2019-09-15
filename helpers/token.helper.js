const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
exports.generateToken = user => {
  let expiresIn = 60 * 60 * 24;
  let token = jwt.sign(user, keys.JWT_KEY, {
    expiresIn
  });
  return { token, expiresIn };
};
