const mongoose = require("mongoose");
const keys = require("./../config/keys");

mongoose
  .connect(keys.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));
