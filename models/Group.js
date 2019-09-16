const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  name: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: "user" }
});

mongoose.model("Groups", groupSchema);
