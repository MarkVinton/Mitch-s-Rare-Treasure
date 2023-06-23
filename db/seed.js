const db = require("./");
const format = require("pg-format");

const manageTables = require("./manage-tables");
const { createRef, formatData } = require("./utils");

const seed = async ({ shopData, treasureData }) => {
  await manageTables();

  const { rows: insertedShops } = await db.query(
    format(
      `INSERT INTO shops (shop_name, owner, slogan) VALUES %L RETURNING *`,
      shopData.map(({ shop_name, owner, slogan }) => [shop_name, owner, slogan])
    )
  );

  const refObj = createRef("shop_name", "shop_id", insertedShops);

  const formattedTreasures = formatData(
    refObj,
    "shop",
    "shop_id",
    treasureData
  );

  await db.query(
    format(
      `INSERT INTO treasures (treasure_name, colour, age, cost_at_auction, shop_id) VALUES %L RETURNING *`,
      formattedTreasures.map(
        ({ treasure_name, colour, age, cost_at_auction, shop_id }) => [
          treasure_name,
          colour,
          age,
          cost_at_auction,
          shop_id,
        ]
      )
    )
  );
};

module.exports = seed;
