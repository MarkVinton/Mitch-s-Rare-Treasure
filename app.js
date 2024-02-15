const express = require("express");
const { getTreasures } = require("./controllers/treasures.controllers");
const { handleCustomErrors } = require("./errors/index.js");

const app = express();

app.get("/api/treasures", getTreasures);

app.all("/*", function (req, res, next) {
  res.status(404).send({ message: "Not Found" });
});

app.use(handleCustomErrors);

module.exports = app;
