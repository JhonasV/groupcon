const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/api/v1/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/v1/group/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/v1/auth/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/v1/user/*", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/v1/*/groups", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/v1/*/group", { target: "http://localhost:5000/" }));
  app.use(proxy("/api/v1/groups/*", { target: "http://localhost:5000/" }));
};
