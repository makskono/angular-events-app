const MONGOOSE = require("mongoose");

const USER_SCHEMA = new MONGOOSE.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = MONGOOSE.model("user", USER_SCHEMA, "users");
