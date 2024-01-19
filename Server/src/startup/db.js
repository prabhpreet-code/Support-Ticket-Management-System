//connection of database.
const mongoose = require("mongoose");

module.exports = function () {
  MongoDbURL = process.env.MONGODB_URL;
  mongoose.connect(MongoDbURL);
  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error : "));
  db.once("open", function () {
    console.log("Database is Ready.... ");
  });
};
