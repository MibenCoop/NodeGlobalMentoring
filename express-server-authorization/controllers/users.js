import users from '../models/users';

export default {
	getAll(req, res) {
		res.send(users);
	}
};