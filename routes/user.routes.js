module.exports = app => {
  const { userController } = require("../controllers");
  const verifyToken = require("../middlewares/verifyToken");
  app.post("/api/v1/user", userController.create);
  app.get("/api/v1/user/current", verifyToken, userController.currentUser);
};
