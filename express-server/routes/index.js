import express from 'express';
import products from './products';
import users from './users';
const router = express.Router();

router.get('/', (req, res) => res.send({ 'status': 'Choose API' }));
router.use('/products', products);
router.use('/users', users);

export default router;