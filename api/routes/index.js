import express from 'express';
// import { checkToken } from '../middlewares/index';
import products from './products';
import users from './users';
// import auth from './auth';
// import authPassport from './authPassport';
import cities from './cities';
const router = express.Router();

// router.get('/', (req, res) => res.send({ 'status': 'Choose API' }));s
// router.use('/products', checkToken);
// router.use('/users', checkToken);
// router.use('/auth', auth);
router.use('/products', products);
router.use('/users', users);
// router.use('/', authPassport);
router.use('/cities', cities);

export default router;