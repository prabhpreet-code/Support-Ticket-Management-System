const express = require("express");
const app = express();

require("dotenv").config();
require("./src/startup/cors")(app);
require("./src/startup/routes")(app);
require("./src/startup/db")();
require("./src/startup/crons")();

const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
