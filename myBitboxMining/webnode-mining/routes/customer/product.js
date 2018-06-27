var express = require('express');
var router = express.Router();

const ProductManager = require('../../modelMgrs/ProductManager');

router.post('/products/:productid/buy', async (req, res, next)=> {
    /**
     * create order
     * create order detail
     * create history
     * create payment
     */
    res.send('ahihi');
})
module.exports = router;
