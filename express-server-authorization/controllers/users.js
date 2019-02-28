import users from '../models/users';

export default {
	getAll(req, res) {
		console.log('getAll');
		res.send(users);
	}
};