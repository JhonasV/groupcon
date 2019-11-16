const mongoose = require("mongoose");

let { Schema } = mongoose;

let groupPasswordSchema = new Schema(
  {
    group: { type: mongoose.Types.ObjectId, ref: "group" },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

mongoose.model("grouppassword", groupPasswordSchema);
