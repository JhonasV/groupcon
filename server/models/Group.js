const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    private: { type: Boolean, default: false },
    url: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "user" }
  },
  { timestamps: true }
);

mongoose.model("group", groupSchema);
