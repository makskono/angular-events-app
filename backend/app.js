const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const api = require("./api");
const app = express();

app.use(cors());

app.use(bodyparser.json());

app.use("/api", api);
app.get("/", (req, res) => res.send("Express hello"));

module.exports = app;
