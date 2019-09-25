const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./data/database");
require("./models");
require("./routes")(app);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "../client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
  console.log(
    "path",
    path.resolve(__dirname, "../client", "build", "index.html")
  );
} else {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
