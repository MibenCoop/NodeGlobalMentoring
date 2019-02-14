import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import usersJSON from '../../models/users';

router.post('/', (req, res) => {
    if (req.query && req.query.email && req.query.pwd) {
        let user = (usersJSON.users.filter(elem => elem.email === req.query.email && elem.pwd === req.query.pwd))[0]; 
        if (user === undefined) {
            res.status(403).send({success: false, message: 'Bad username/password combination.' });
        } else {
            const payload = { "sub": user.id };
            let token = jwt.sign(payload, 'secret', {expiresIn: 10});
            res.status(200).send({code: "200", message: "OK", data: { user: {email: user.email, username: user.username }, token }})
        }
    }
    return res.status(403).send({sucess: false, message: "Something goes wrong"});
});

export default router;