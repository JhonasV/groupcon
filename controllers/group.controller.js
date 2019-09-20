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
    user: req.body.id
  };

  console.log(req.user);

  try {
    let isCreated = await new Group(group).save();
    res.json(isCreated);
    console.log("Created response ", isCreated);

    next();
  } catch (error) {
    let duplicatedKey = 11000;
    if (error.code === duplicatedKey) {
      return res
        .status(400)
        .json(`Already exists a group with the name: ${group.name}`);
    }

    if (!group.name) return res.status(400).json(error.errors.url.message);
    if (!group.url) return res.status(400).json(error.errors.url.message);

    return res.json("Something wen't wrong");
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
