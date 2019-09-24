module.exports = app => {
  const { authController, userController } = require("../controllers");
  const verifyToken = require("../middlewares/verifyToken");
  app.post("/api/v1/auth/register", userController.create);
  app.post("/api/v1/auth/login", authController.login);

  app.get("/api/v1/auth/current", verifyToken, authController.currentUser);
};
