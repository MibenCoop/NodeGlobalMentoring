import User from '../models/user';

export default {
	getAll(req, res) {
		let user = new User();
		User.find((err, users) => {
			if (err) {
				console.log('err', err);
			}
			res.send(users);
		});
	},
	deleteUserById(req, res) {
		let query = { '_id': req.params.id };
		User.find(query, (err, user) => {
			if (user.length === 0 ) {
				res.send('Database does not contain item with such ID');
			} else {
				if (err) {
					console.log('err', err);
				}
				User.remove(query, (err) => {
					res.send('Success');
				});
			}
		});
	}
};