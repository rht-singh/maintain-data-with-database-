const express = require("express");
const routing = require("./routes");
const app = express();

app.use(express.json());
app.use("/", routing);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
