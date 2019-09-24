const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    nickname: { type: String, unique: true }
  },
  { timestamps: true }
);

userSchema.pre(
  "save",
  function(next) {
    let user = this;
    if (!user.isModified("password")) {
      return next();
    }

    bcrypt.hash(user.password, 10).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  },
  function(error) {
    next(error);
  }
);

userSchema.methods.comparePassword = (candidatePassword, next) => {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return next();
    next(null, isMatch);
  });
};

mongoose.model("user", userSchema);
