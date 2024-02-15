const { readAllTreasures } = require("../models/treasures.models");

const getTreasures = (req, res, next) => {
  const { sort_by = "age" } = req.query;

  readAllTreasures(sort_by)
    .then(({ rows }) => {
      res.status(200).send({ treasures: rows });
    })
    .catch(next);
};

module.exports = { getTreasures };
