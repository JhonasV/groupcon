module.exports = app => {
  const varifyToken = require("../middlewares/verifyToken");
  const { groupController } = require("../controllers");
  app.get("/api/v1/group", groupController.get);
  app.get("/api/v1/:id/group", varifyToken, groupController.getById);
  app.get("/api/v1/group/:email", groupController.getByUserEmail);
  app.post("/api/v1/group", groupController.create);
  app.get("/api/v1/:userId/groups", groupController.getByUserId);
};
