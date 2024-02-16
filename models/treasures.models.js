const { property } = require("lodash");
const treasures = require("../db/data/test-data/treasures");
const db = require("../db/index");
const format = require("pg-format");

const readAllTreasures = (sort_by, order) => {
  if (
    (sort_by === "age" ||
      sort_by === "cost_at_auction" ||
      sort_by === "treasure_name") &&
    (order === "asc" || order === "desc")
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
  const queryString = `SELECT treasure_id, treasure_name, colour, age, cost_at_auction, shop_name from treasures JOIN shops ON treasures.shop_id = shops.shop_id`;
  return db.query(queryString).then(({ rows }) => {
    const result = rows.filter((row) => row.colour === colour);
    if (result.length !== 0) {
      return { rows: result };
    } else {
      return Promise.reject({
        status: 400,
        message: "Bad Request",
      });
    }
  });
};

const createTreasure = (treasure) => {
  const validTreasureProperties = [
    "treasure_name",
    "colour",
    "age",
    "cost_at_auction",
    "shop_id",
  ];
  let isValidTreasure = true;

  validTreasureProperties.forEach((property) => {
    if (!treasure[property]) {
      isValidTreasure = false;
    }
  });

  if (!isValidTreasure) {
    return Promise.reject({ status: 400, message: "Bad Request" });
  }

  const { treasure_name, colour, age, cost_at_auction, shop_id } = treasure;

  const queryString = `INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) SELECT $1, $2, $3, $4, $5 WHERE EXISTS (SELECT * FROM shops WHERE shop_id = $5) RETURNING *;`;

  return db
    .query(queryString, [treasure_name, colour, age, cost_at_auction, shop_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          message: "Bad Request",
        });
      }

      return rows[0];
    });
};

const updateTreasure = (cost_at_auction, treasure_id) => {
  const queryString =
    "UPDATE treasures SET cost_at_auction = $1 WHERE treasure_id = $2 RETURNING *;";
  return db
    .query(queryString, [cost_at_auction, treasure_id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 400,
          message: "Bad Request",
        });
      }
      return rows[0];
    });
};


module.exports = {
  readAllTreasures,
  readAllTreasuresByColour,
  createTreasure,
  updateTreasure,
};
