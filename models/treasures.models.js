const db = require("../db/index");

const readAllTreasures = () => {
  return db
    .query(`SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name from treasures JOIN shops ON treasures.shop_id = shops.shop_id ORDER BY age;`)
    .then((response) => {
      return response;
    })
};

module.exports = { readAllTreasures };
