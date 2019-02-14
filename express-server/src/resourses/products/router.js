import express from 'express';
const router = express.Router();
import products from '../../models/products';
import {checkToken} from '../../common/utils';
//Get all products
router.get('/', checkToken, (req, res) => {
    res.send(products);
});

//Get by Id
router.get('/:id', checkToken, (req, res) => {
    let product = products.filter(elem => elem.id === Number(req.params.id));
                                    //spread array to object
    res.send(product);
});

//Get product reviews
router.get('/:id/reviews', checkToken, (req, res) => {
    let product = products.filter(elem => elem.id === Number(req.params.id));
    res.send(product[0].reviews);
});


// //Not very convenenient to implementing POST without DB
// router.post('/products', checkToken, (req, res) => {
//     //Save to DB
// });

export default router;