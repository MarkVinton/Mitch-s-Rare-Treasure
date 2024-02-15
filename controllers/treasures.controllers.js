const { readAllTreasures } = require("../models/treasures.models");

const getTreasures = (req, res) => {
  const { sort_by = "age" } = req.query;

  if (
    sort_by === "age" ||
    sort_by === "cost_at_auction" ||
    sort_by === "treasure_name"
  ) {
    readAllTreasures(sort_by).then(({ rows }) => {
      res.status(200).send({ treasures: rows });
    });
  } else {
    return res.status(400).send({ message: "Bad Request" });
  }
};

module.exports = { getTreasures };
