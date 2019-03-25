import express from 'express';
import City from '../controllers/cities';
const router = express.Router();

router.get('/random', City.getRandomCity);
router.get('', City.getAll);
router.put('/:id', City.changeCity);
router.post('', City.setCity);
router.delete('/:id', City.deleteCity);
export default router;