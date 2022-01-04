const { Router } = require('express');
const Product = require('../model/Product');

const router = Router();

router.get('/products', async (req, res) => {
    const limit  = parseInt(req.query.limit) || 5;
    const page = parseInt(req.query.page) || 1;
    const productsList = await Product.paginate({}, {limit, page});
    res.json(productsList);
});

router.post('/products', async (req, res) => {
    const { name, price } = req.body;
    const newProduct = new Product({
        name, price
    });
    try{
        await newProduct.save();

    }catch(err){
        console.log("Creating product failed!")
    }

    res.send('created products')
});


module.exports = router;