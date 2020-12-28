const mongoose = require("mongoose");
const Group = mongoose.model("group");
const GroupPassword = mongoose.model("grouppassword");

const { validateGroups } = require("../validation");
const { sendInviteLinkMail } = require("../services/mailer");
exports.create = async (req, res, next) => {
  let { url, name, password, private, confirmPassword } = req.body;
  let { error } = validateGroups({ url, name });
  if (error)
    return res.status(400).json({
      error: error.details[0].message.split('"').join(" "),
    });
  let isPrivate = password.length > 0 || private;

  if(isPrivate && password !== confirmPassword)
    return res.status(400).json({
      error: "password and confirm password does not match"
    });


  let group = {
    name: req.body.name,
    url: req.body.url,
    user: req.user.id,
    private: isPrivate,
  };

  try {
    let groupExists = await Group.findOne({ name: group.name });
    if (groupExists)
      return res.status(400).json({
        error: "Group Name already exists",
      });

    let isCreated = await new Group(group).save();

    if(password?.length > 0){
      await insertGroupPasswordData(isCreated.id, password);
    }


    res.json(isCreated);

    next();
  } catch (error) {
    return res.json({ error: "Something wen't wrong" });
  }
};

exports.get = async (req, res, next) => {
  let groups = await Group.find();
  let latestGroups = await Group.find().sort({ createdAt: -1 }).limit(3);
  groups = hideUrlForPrivateGroups(groups);
  latestGroups = hideUrlForPrivateGroups(latestGroups);
  res.json({ groups, latestGroups });

  next();
};

const hideUrlForPrivateGroups = (groups) => {
  return groups.map((group) => {
    if (group.private) {
      group.url = "";
    }
    return group;
  });
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
  console.log(req.body);
  console.log(req.params);
  let { url, name, _id, password } = req.body;
  let { id } = req.params;
  let { error } = validateGroups({ url, name });
  if (error)
    return res
      .status(400)
      .json({ error: error.details[0].message.split('"').join(" ") });

  try {
    let isPrivate = false;

    if (password.length > 0) {
      isPrivate = true;
      await insertGroupPasswordData(id, password);
    }

    let isModified = await Group.findByIdAndUpdate(id, {
      url,
      name,
      private: isPrivate,
    });

    if (isModified) res.json(isModified);
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong", errorDetail: err });
  }
};

const insertGroupPasswordData = async (group, password) => {

  let groupPasswordReg = await GroupPassword.findOne({ group });

  if (groupPasswordReg) {
    await GroupPassword.findOneAndUpdate({ group }, { password });
  } else {
    await new GroupPassword({ group, password }).save();
  }
};

exports.delete = async (req, res, next) => {
  let { id } = req.params;

  let groupRemoved = await Group.findOneAndRemove({ _id: id });
  res.json({ removed: groupRemoved ? true : false });
  next();
};

exports.sendEmail = async (req, res, next) => {
  let { groupId, toEmail } = req.body;

  try {
    let group = await Group.findById(groupId);
    await sendInviteLinkMail(toEmail, group.url, group.name);
  } catch (error) {
    res.status(500).json({ error: "Error sending the email, try later." });
  }

  res.json("Email sended!");
  next();
};

exports.unlock = async (req, res, next) => {
  let { groupId, password } = req.body;
  //1. Search for the group by groupId
  //..
  let groupPassword = await GroupPassword.findOne({ group: groupId }).populate(
    "group"
  );
  console.log("[group.controller.js]", groupPassword);

  //2. Validate if the password match
  //..
  if (groupPassword && groupPassword.password === password) {
    res.status(200).json({ unlock: true, group: groupPassword.group });
    next();
  }
  //3. If reach this line if because the password is wrong
  return res.status(202).json({ unlock: false });
};
