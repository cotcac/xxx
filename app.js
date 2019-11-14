const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
// const logger = require('morgan');
const logRequest = require("./helper/log_request");
const app = express();
require("dotenv").config();
// set default enviroment
process.env.NODE_ENV = process.env.NODE_ENV || "development";
app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
require("./routes")(app);

module.exports = app;
