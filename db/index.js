const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "dev";

const path = `${__dirname}/../.env.${ENV}`;

require("dotenv").config({ path });

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

module.exports = new Pool();
