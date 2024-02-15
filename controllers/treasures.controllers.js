const { readAllTreasures,readAllTreasuresByColour,createTreasure } = require("../models/treasures.models");

const getTreasures = (req, res, next) => {
  const { sort_by = 'age', order = 'asc',colour } = req.query;
  if(colour){
    readAllTreasuresByColour(colour)
    .then(({rows}) => {
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

const postTreasures = (req, res, next) => {
  const treasure = req.body
  createTreasure(treasure)
  .then((treasure) => {
    res.status(201).send({treasure})
  })
  .catch(next)
}

module.exports = { getTreasures, postTreasures };
