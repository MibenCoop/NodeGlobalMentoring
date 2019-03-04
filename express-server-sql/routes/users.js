import express from 'express';
import Users from '../controllers/users';
const router = express.Router();

router.get('/', Users.getAll);

export default router;