const express = require("express");
const cors = require("express");
require("./config/dbConfig");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//Routes
const userRoute = require("./routes/user.route");

let contextPath = "/api/v1";

app.get(`${contextPath}/check`, (req, res) => {
  res.send({ message: "Application Running" });
});
app.use(`${contextPath}/user`, userRoute);

module.exports = app;
