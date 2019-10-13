module.exports = app => {
  const { userController } = require("../controllers");
  app.post("/api/v1/user", userController.create);
  app.post("/api/v1/user/updatePassword", userController.updatePassword);
};
