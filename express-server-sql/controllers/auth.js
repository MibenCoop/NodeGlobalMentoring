import jwt from 'jsonwebtoken';
import _ from 'lodash';
import users from '../models/users';

export default {
	logIn(req, res) {
		let user = _.find(users, { email: req.body.email });
		console.log('user', user);
		if ( user === undefined || user.pwd !== req.body.pwd) {
			res.status(403).send({ success: false, message: 'Bad username/password combination.' });
		} else {
			const payload = { 'sub': user.id };
			let token = jwt.sign(payload, 'secret', { expiresIn: 1000 });
			res.status(200).send({ code: '200', message: 'OK', data: { user: { email: user.email, username: user.username }, token } });
		}
	}
};