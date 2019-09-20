const mongoose = require("mongoose");
const User = mongoose.model("user");
const { validateRegister } = require("../validation");

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
    password,
    nickname
  });

  res.json({ ...token, ...userCreated });
  next();
};

exports.currentUser = (req, res, next) => {
  res.json(req.user);
  next();
};
