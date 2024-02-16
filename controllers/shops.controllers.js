const {selectShops} = require('../models/shops.models')

const getShops = (req,res,next) => {
    selectShops()
    .then((rows) =>{
        
        res.status(200).send({shops: rows})
    })
    .catch(next)
}

module.exports = {getShops}