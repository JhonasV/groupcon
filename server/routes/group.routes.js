module.exports = app => {
  const verifyToken = require("../middlewares/verifyToken");
  const { groupController } = require("../controllers");
  app.get("/api/v1/group", groupController.get);
  app.get("/api/v1/:userId/groups", groupController.getByUserId);
  app.post("/api/v1/group/mail", groupController.sendEmail);

  app.put("/api/v1/:id/group", verifyToken, groupController.update);
  app.delete("/api/v1/group/:id", verifyToken, groupController.delete);
  app.post("/api/v1/group", verifyToken, groupController.create);
  app.get("/api/v1/:id/group", verifyToken, groupController.getById);

  app.post("/api/v1/group/unlock", groupController.unlock);
};
