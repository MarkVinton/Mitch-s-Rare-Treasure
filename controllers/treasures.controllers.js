const { readAllTreasures,readAllTreasuresByColour,createTreasure,updateTreasure } = require("../models/treasures.models");

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
const patchTreasure = (req,res,next) => {
  const {cost_at_auction} = req.body
  const {treasure_id} = req.params
  updateTreasure(cost_at_auction, treasure_id)
  .then((treasure) => {
    res.status(200).send({treasure})
  })
  .catch(next)
}

module.exports = { getTreasures, postTreasures, patchTreasure };
