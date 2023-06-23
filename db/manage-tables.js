const db = require("./");
const { createShopsQuery, createTreasuresQuery } = require("./queries");

async function manageTables() {
  await db.query(`DROP TABLE IF EXISTS treasures;`);

  await db.query(`DROP TABLE IF EXISTS shops;`);

  await db.query(createShopsQuery);

  await db.query(createTreasuresQuery);
}

module.exports = manageTables;
