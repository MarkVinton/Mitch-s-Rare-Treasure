const express = require("express");
const { getTreasures } = require("./controllers/treasures.controllers");

const app = express();

app.get("/api/treasures", getTreasures);

app.all('/*', function (req, res, next) {
	res.status(404).send({ message: "Not Found"})
})

module.exports = app;
