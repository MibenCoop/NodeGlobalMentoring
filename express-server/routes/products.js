import express from 'express';
import Products from '../controllers/products';
const router = express.Router();

router.get('/', Products.getAll);
router.get('/:id', Products.getById);
router.get('/:id/reviews', Products.getReviewsByProductId);

export default router;