const express = require("express");
const cors = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

let contextPath = "/api/v1";

app.get(`${contextPath}/check`, (req, res) => {
  res.send({ message: "Application Running" });
});

module.exports = app;
