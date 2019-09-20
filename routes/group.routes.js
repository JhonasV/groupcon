module.exports = app => {
  const verifyToken = require("../middlewares/verifyToken");
  const { groupController } = require("../controllers");
  app.get("/api/v1/group", groupController.get);
  app.get("/api/v1/:id/group", verifyToken, groupController.getById);
  app.get("/api/v1/group/:email", groupController.getByUserEmail);
  app.post("/api/v1/group", verifyToken, groupController.create);
  app.get("/api/v1/:userId/groups", groupController.getByUserId);
  app.put("/api/v1/:id/group", verifyToken, groupController.update);
};
