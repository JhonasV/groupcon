const tokenHelper = require("../helpers/token.helper");
const { validateLogin, validateEmail } = require("../validation");
const mongoose = require("mongoose");
const User = mongoose.model("user");
const bcrypt = require("bcrypt");
const { sendForgottenPasswordEmail } = require("../services/mailer");
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
  const token = tokenHelper.generateToken({
    id: user._id,
    email,
    nickname: user.nickname
  });

  res.json({ ...token, current: req.user });
  next();
};

exports.forgottenPassword = async (req, res, next) => {
  let { error } = validateEmail(req.email);
  if (error) return res.status(400).json(error.details[0].message);

  let userExists = await User.findOne({ email: req.body.email });
  if (!userExists) return next();

  let recoverCode = await bcrypt.hash("SUPER_SECRET_CODE", 5);
  userExists.recoverCode = recoverCode.split("/").join("-");

  await User.findByIdAndUpdate(userExists._id, userExists);
  sendForgottenPasswordEmail(userExists);
  res.json({ message: "Email sended succesfully" });
  next();
};

exports.verifyPasswordChangeCode = async (req, res, next) => {
  let { email, code } = req.body;

  let user = await User.findOne({ email });

  if (!user)
    return res.status(404).json({ message: "The email could't be found" });

  if (code === user.recoverCode)
    res.status(200).json({ message: "Can continue to change the password" });
  next();
};

exports.currentUser = (req, res, next) => {
  res.json(req.user);
  next();
};
