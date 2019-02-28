import express from 'express';
import { checkToken } from '../middlewares/index';
import products from './products';
import users from './users';
import auth from './auth';
const router = express.Router();

router.get('/', (req, res) => res.send({ 'status': 'Choose API' }));

router.use('/products', checkToken);
router.use('/users', checkToken);
router.use('/auth', auth);
router.use('/products', products);
router.use('/users', users);

export default router;