const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");
const CORS = require("cors");

const API = require("./api");
const APP = EXPRESS();

APP.use(CORS());

APP.use(BODY_PARSER.json());

APP.use("/api", API);
APP.get("/", (req, res) => res.send("Express hello"));

module.exports = APP;
