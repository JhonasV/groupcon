module.exports = app => {
  require("./group.routes")(app);
  require("./auth.routes")(app);
  require("./user.routes")(app);
};
