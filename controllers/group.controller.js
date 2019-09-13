const mongoose = require("mongoose");
const Group = mongoose.model("Groups");

exports.create = async (req, res, next) => {
  let group = {
    name: req.body.name,
    url: req.body.url
  };

  console.log("Group object from client ", group);
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

exports.getByName = async (req, res, next) => {
  let groupName = req.params.name;
  try {
    let group = await Group.findOne({ name: groupName });
    res.json(group);

    next();
  } catch (error) {
    if (error.name === "CastError")
      return res.status(404).json("The resources doesn't exists");

    return res.status(500).json("Something wen't wrong");
  }
};
