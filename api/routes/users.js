import express from 'express';
import Users from '../controllers/users';
const router = express.Router();

router.get('/', Users.getAll);
router.delete('/:id', Users.deleteUserById);

export default router;