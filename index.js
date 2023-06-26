const express = require("express");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();
const app = express();

require("./db");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("hlw");
});
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("app is up and running");
});
