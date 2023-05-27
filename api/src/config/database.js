const mongoose = require("mongoose");
const { MONGODB_URI } = process.env;

exports.connect = async function () {
  try {
    console.log("connecting to database ...");
    await mongoose.connect(MONGODB_URI);
    console.log("connected to database successfully!");
  } catch (error) {
    console.log({ error: error.toString() });
  }
};
