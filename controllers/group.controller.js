const mongoose = require("mongoose");
const Group = mongoose.model("Groups");
const User = mongoose.model("user");

const { validateGroups } = require("../validation");
exports.create = async (req, res, next) => {
  let { error } = validateGroups(req.body);
  if (error)
    return res.status(400).json({
      error: error.details[0].message.split('"').join(" ")
    });

  let group = {
    name: req.body.name,
    url: req.body.url,
    user: req.user.id,
    password: req.body.password
  };

  console.log(group);

  try {
    let groupExists = await Group.findOne({ name: group.name });
    if (groupExists)
      return res.status(400).json({
        error: "Group Name already exists"
      });

    let isCreated = await new Group(group).save();
    console.log(isCreated);
    res.json(isCreated);

    next();
  } catch (error) {
    return res.json({ error: "Something wen't wrong" });
  }
};

exports.get = async (req, res, next) => {
  let groups = await Group.find();
  res.json(groups);

  next();
};

exports.getById = async (req, res, next) => {
  let groupId = req.params.id;
  try {
    let group = await Group.findById(groupId);
    res.json(group);

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "CastError")
      return res.json("The resources doesn't exists");

    return res.status(500).json("Something wen't wrong");
  }
};

exports.getByUserEmail = async (req, res, next) => {
  let email = req.params.email;
  try {
    let user = await User.findOne({ email: email });
    let groups = await Group.find({ user: user._id });

    res.json(groups);

    next();
  } catch (error) {
    if (error.name === "CastError")
      return res.status(404).json("The resources doesn't exists");

    return res.status(500).json("Something wen't wrong");
  }
};

exports.getByUserId = async (req, res, next) => {
  let userId = req.params.userId;
  try {
    let groups = await Group.find({ user: userId });

    res.json(groups);

    next();
  } catch (error) {
    if (error.name === "CastError")
      return res.status(404).json("The resources doesn't exists");

    return res.status(500).json("Something wen't wrong");
  }
};

exports.update = async (req, res, next) => {
  let { url, name, _id } = req.body;
  let { id } = req.params;
  let { error } = validateGroups({ url, name });
  if (error)
    return res
      .status(400)
      .json({ error: error.details[0].message.split('"').join(" ") });

  try {
    let isModified = await Group.findByIdAndUpdate(id, { url, name });
    if (isModified) res.json(isModified);
    next();
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

exports.delete = async (req, res, next) => {
  let { id } = req.params;

  let groupRemoved = await Group.findOneAndRemove({ _id: id });
  res.json(groupRemoved);
  next();
};
