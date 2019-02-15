import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import _ from "lodash";
import users from '../../models/users';

router.post('/', (req, res) => {
    let user = _.find(users, {email: req.query.email});
    if ( user === undefined || user.pwd !== req.query.pwd) {
        res.status(403).send({success: false, message: 'Bad username/password combination.' });
    } else {
        const payload = { "sub": user.id };
        let token = jwt.sign(payload, 'secret', {expiresIn: 100});
        res.status(200).send({code: "200", message: "OK", data: { user: {email: user.email, username: user.username }, token }})
    }
});



export default router;