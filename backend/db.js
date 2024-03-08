const chalk = require("chalk");
const mongoose = require("mongoose");

const db = mongoose
  .connect(
    "mongodb+srv://Arnab:12345@devs.umobk28.mongodb.net/intern?retryWrites=true&w=majority&appName=devs"
  )
  .then((r) => console.log(chalk.blue.bold("Database Connected")))
  .catch((err) => console.error(err));

module.exports = db;
