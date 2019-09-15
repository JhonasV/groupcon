const tokenHelper = require("../helpers/token.helper");
const { validateRegister } = require("../validation");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  let { error } = validateRegister(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  let { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) return res.status(400).send("Email or password is wrong");

  let validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Password is wrong");

  const token = tokenHelper.generateToken({ email, password });

  res.json({ ...token, current: req.user });
  next();
};

exports.currentUser = (req, res, next) => {
  res.json(req.user);
  next();
};
