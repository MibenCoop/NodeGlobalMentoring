import User from '../models/user';

export default {
	getAll(req, res) {
		User
			.find()
			.catch(err => {
				console.log('err', err);
				res.send('Something goes wrong')
			})
			.then(users => res.send(users));
	},
	deleteUserById(req, res) {
		let query = {
			'_id': req.params.id
		};
		User
			.find()
			.catch(err => {
				console.log('err', err);
				res.send('Something goes wrong')
			})
			.then(
				User
				.remove(query)
				.catch(err => console.log('err', err))
				.then(() => res.send('Success'))
			)
	}
};