import express from 'express';
import usersJSON from '../../models/users';
const router = express.Router();
router.get('/', (req, res) => {
    const parsedUsers = JSON.stringify(usersJSON);
    res.send(parsedUsers);
})

export default router;