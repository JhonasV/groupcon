const tokenHelper = require("../helpers/token.helper");
const { validateLogin } = require("../validation");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");

exports.login = async (req, res, next) => {
  let { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  let { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ error: "Email or password is wrong" });

  let validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res.status(400).json({ error: "Email or password is wrong" });
  console.log(user);
  const token = tokenHelper.generateToken({
    id: user._id,
    email,
    password,
    nickname: user.nickname
  });

  res.json({ ...token, current: req.user });
  next();
};

exports.currentUser = (req, res, next) => {
  res.json(req.user);
  next();
};
