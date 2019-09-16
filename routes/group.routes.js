module.exports = app => {
  const { groupController } = require("../controllers");
  app.get("/api/v1/group", groupController.get);
  // app.get("/api/v1/group/:id", groupController.getById);
  app.get("/api/v1/group/:email", groupController.getByUserEmail);
  app.post("/api/v1/group", groupController.create);
};
