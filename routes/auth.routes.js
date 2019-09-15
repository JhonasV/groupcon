module.exports = app => {
  const { authController, userController } = require("../controllers");
  app.post("/api/v1/auth/register", userController.create);
  app.post("/api/v1/auth/login", authController.login);

  app.get("/api/v1/auth/currentuser", authController.currentUser);
};
