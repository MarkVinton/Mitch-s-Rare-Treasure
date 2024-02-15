const { readAllTreasures,readAllTreasuresByColour } = require("../models/treasures.models");

const getTreasures = (req, res, next) => {
  const { sort_by = 'age', order = 'asc',colour } = req.query;
  if(colour){
    readAllTreasuresByColour(colour)
    .then(({rows}) => {
      console.log(rows);
      res.status(200).send({treasures: rows})
    })
    .catch(next)
  }else{
  readAllTreasures(sort_by,order)
    .then(({ rows }) => {
      res.status(200).send({ treasures: rows });
    })
    .catch(next);
  }
};

module.exports = { getTreasures };
