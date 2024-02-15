const { readAllTreasures } = require("../models/treasures.models");

const getTreasures = (req, res) => {
  readAllTreasures().then(({ rows }) => {
    res.status(200).send({ treasures: rows });
  });
};

module.exports = { getTreasures };
