import express from 'express';
const router = express.Router();
import users from '../../models/users';
import { checkToken } from '../../common/utils';
router.get('/', checkToken, (req, res) => {
    res.send(users);
})

export default router;