import User from '../models/user';

export default {
	getAll(req, res) {
		let user = new User();
		user.firstName = 'John';
		user.lastName = 'Doe';
		user.save((err)=> {
			if (err) {
				console.log(err);
			} else {
				console.log('good');
			}
		});
		console.log('!!!!');
		User.find((err, users) => {
			if (err) {
				console.log('err', err);
			}
			console.log('users', users);
			res.send(users);
		});
	}
};