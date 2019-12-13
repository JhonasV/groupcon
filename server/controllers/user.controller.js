const mongoose = require("mongoose");
const User = mongoose.model("user");

const {
  validateRegister,
  validateEmail,
  validatePassword
} = require("../validation");

const bcrypt = require("bcrypt");

const tokenHelper = require("../helpers/token.helper");
exports.create = async (req, res, next) => {
  let { error } = validateRegister(req.body);

  if (error) return res.status(400).json(error.details[0].message);
  let { email, password, nickname } = req.body;

  let emailExists = await User.findOne({ email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  let nickNameExists = await User.findOne({ nickname });
  if (nickNameExists)
    return res.status(400).json({ error: "NickName already exists" });

  let userCreated = await new User({ email, password, nickname }).save();
  let token = tokenHelper.generateToken({
    id: userCreated._id,
    email,
    nickname
  });
  let responseObject = {
    token: token.token,
    expiresIn: token.expiresIn,
    userId: userCreated.id
  };

  res.json(responseObject);
  next();
};

exports.currentUser = (req, res, next) => {
  res.json(req.user);
  next();
};

exports.updatePassword = async (req, res, next) => {
  let { password, email } = req.body;
  let validatePasswordError = validatePassword({ password });
  if (validatePasswordError.error)
    return res.status(400).json(validatePasswordError.error.details[0].message);

  let validateEmailError = validateEmail({ email });
  if (validateEmailError.error)
    return res.status(400).json(validateEmailError.error.details[0].message);

  let passwordHashed = await bcrypt.hash(password, 10);

  let user = await User.findOne({ email });
  user.password = passwordHashed;
  user.recoverCode = "";

  let updatedUser = await User.findByIdAndUpdate(user._id, user);
  if (updatedUser) {
    // authController.login(req, res, next);
    res.json({ message: "Password updated succesfully" });
  }
  next();
};
