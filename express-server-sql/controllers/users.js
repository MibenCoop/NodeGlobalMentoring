import models from '../models/';

export default {
	getAll(req, res) {
		models.User.findAll().then(users => {
			res.send(users);
		});
	}
};