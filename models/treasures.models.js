const db = require("../db/index");
const format = require("pg-format");

const readAllTreasures = (sort_by) => {
  const queryString = format(
    `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name from treasures JOIN shops ON treasures.shop_id = shops.shop_id ORDER BY %s;`,
    sort_by
  );

  return db.query(queryString).then((response) => {
    return response;
  });
};

module.exports = { readAllTreasures };
