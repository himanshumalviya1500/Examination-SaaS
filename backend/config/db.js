const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const MONGO_URI = `mongodb+srv://himanshumalviya10:AGiH95TSpISXrUxO@cluster0.kyvcsoo.mongodb.net/?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
