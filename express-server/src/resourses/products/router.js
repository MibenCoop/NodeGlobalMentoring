import express from 'express';
const router = express.Router();
import productsJSON from '../../models/products';

//Get all products
router.get('/', (req, res) => {
    const parsedProducts = JSON.stringify(productsJSON);
    res.send(parsedProducts);
});

//Get by Id
router.get('/:id', (req, res) => {
    let product = productsJSON.products.filter(elem => elem.id === Number(req.params.id));
                                    //spread array to object
    const parsedProducts = JSON.stringify(...product);
    res.send(parsedProducts);
});

//Get product reviews
router.get('/:id/reviews', (req, res) => {
    let product = productsJSON.products.filter(elem => elem.id === Number(req.params.id));
    const parsedProducts = JSON.stringify(product[0].reviews);
    res.send(parsedProducts);
});


//Not very convenenient to implementing POST without DB
router.post('/products', (req, res) => {
    //Save to DB
});

export default router;