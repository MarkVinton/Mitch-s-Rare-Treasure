const express = require("express");
const { getTreasures } = require("./controllers/treasures.controllers");

const app = express();

app.get("/api/treasures", getTreasures);

module.exports = app;
