const db = require("../db/index");

const selectShops = () => {
const queryString = `SELECT shops.*, SUM(cost_at_auction) AS stock_value
FROM shops 
JOIN treasures ON shops.shop_id = treasures.shop_id 
GROUP BY shops.shop_id
ORDER BY shops.shop_id;`
return db.query(queryString)
.then(({rows}) => {
    return rows
})
}

module.exports = {selectShops}