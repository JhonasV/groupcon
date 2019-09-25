const mongoose = require("mongoose");
const Group = mongoose.model("Groups");
const User = mongoose.model("user");

const { validateGroups } = require("../validation");
const { sendInviteLinkMail } = require("../services/mailer");
exports.create = async (req, res, next) => {
  let { url, name } = req.body;
  let { error } = validateGroups({ url, name });
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

  try {
    let groupExists = await Group.findOne({ name: group.name });
    if (groupExists)
      return res.status(400).json({
        error: "Group Name already exists"
      });

    let isCreated = await new Group(group).save();
    res.json(isCreated);

    next();
  } catch (error) {
    return res.json({ error: "Something wen't wrong" });
  }
};

exports.get = async (req, res, next) => {
  let groups = await Group.find();
  let latestGroups = await Group.find()
    .sort({ createdAt: -1 })
    .limit(3);

  res.json({ groups, latestGroups });

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

exports.sendEmail = async (req, res, next) => {
  let { groupId, toEmail } = req.body;

  try {
    let group = await Group.findById(groupId);
    await sendInviteLinkMail(toEmail, group.url, group.name);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error sending the email, try later." });
  }

  res.json("Email sended!");
  next();
};
