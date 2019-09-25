module.exports = (app, express) => {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
};
