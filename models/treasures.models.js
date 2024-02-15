const db = require("../db/index");
const format = require("pg-format");

const readAllTreasures = (sort_by, order) => {
  if (
    ((sort_by === "age" ||
      sort_by === "cost_at_auction" ||
      sort_by === "treasure_name") 
      &&
    (order === "asc" || order === "desc"))
  ) {
    const queryString = format(
      `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name from treasures JOIN shops ON treasures.shop_id = shops.shop_id %s;`,
      `ORDER BY ${sort_by} ${order}`
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
const readAllTreasuresByColour = (colour) => {
  
  const queryString = 
    `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name from treasures JOIN shops ON treasures.shop_id = shops.shop_id`
    return db.query(queryString).then(({rows}) => {
      const result = rows.filter(row => row.colour === colour)
      if(result.length !== 0){
        return {rows: result}
      }else{
        return Promise.reject({
          status: 400,
          message: "Bad Request",
        });
      }
    })
}
module.exports = { readAllTreasures,readAllTreasuresByColour };
