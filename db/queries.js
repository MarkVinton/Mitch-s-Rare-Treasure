exports.createShopsQuery = `CREATE TABLE shops (
    shop_id SERIAL PRIMARY KEY,
    shop_name VARCHAR,
    owner VARCHAR,
    slogan VARCHAR);
    `;

exports.createTreasuresQuery = `CREATE TABLE treasures (
    treasure_id SERIAL PRIMARY KEY,
    treasure_name VARCHAR,
    colour VARCHAR,
    age INT,
    cost_at_auction FLOAT,
    shop_id INT REFERENCES shops(shop_id));
    `;
