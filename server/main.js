const express = require("express");
const app = express();

const morgan = require("morgan");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
require("./data/database");
require("./models");
require("./routes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
