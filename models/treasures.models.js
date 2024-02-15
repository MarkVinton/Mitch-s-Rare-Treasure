const db = require("../db/index");
const format = require("pg-format");

const readAllTreasures = (sort_by, order) => {
  if (
    (sort_by === "age" ||
      sort_by === "cost_at_auction" ||
      sort_by === "treasure_name") 
      &&
    (order === "asc" || order === "desc")
  ) {
    const queryString = format(
      `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name from treasures JOIN shops ON treasures.shop_id = shops.shop_id ORDER BY %s;`,
      `${sort_by} ${order}`
    );
    return db.query(queryString).then((response) => {
      return response;
    });
  } else {
    return Promise.reject({
      status: 400,
      message: "Bad Request",
    });
  }
};

module.exports = { readAllTreasures };
