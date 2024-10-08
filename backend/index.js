const express = require("express");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const teacher = require("./routes/teacher");
const student = require("./routes/student");
const InitiateMongoServer = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require('cors');
var path = require("path");
require('dotenv').config()

// Initiate Mongo Server
InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/user", user);
app.use("/teacher", teacher);
app.use("/student", student);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
