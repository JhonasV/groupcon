const mongoose = require("mongoose");
const User = mongoose.model("user");
const { validateRegister } = require("../validation");

const tokenHelper = require("../helpers/token.helper");
exports.create = async (req, res, next) => {
  let { error } = validateRegister(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  let { email, password } = req.body;

  let emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  let userCreated = await new User({ email, password }).save();
  let token = tokenHelper.generateToken({ email, password });

  res.json({ token, userCreated });
  next();
};

exports.currentUser = (req, res, next) => {
  res.json(req.user);
  next();
};
