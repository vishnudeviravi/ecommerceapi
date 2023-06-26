const mongoose = require("mongoose");

console.log(process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch(e => {
    console.log("error occurred while connecting to database");
  });

module.exports = mongoose;
