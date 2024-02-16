const express = require("express");
const { getTreasures, postTreasures,patchTreasure } = require("./controllers/treasures.controllers");
const { handleCustomErrors, handlePsqlErrors } = require("./errors/index.js");

const app = express();
app.use(express.json())

app.get("/api/treasures", getTreasures);

app.post('/api/treasures', postTreasures)

app.patch('/api/treasures/:treasure_id',patchTreasure)

app.all("/*", function (req, res, next) {
  res.status(404).send({ message: "Not Found" });
});
app.use(handleCustomErrors);
app.use(handlePsqlErrors);

module.exports = app;
