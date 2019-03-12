import City from '../models/city';

export default {
	getAll(req, res) {
		City
			.find()
			.catch(err => {
				console.log('err', err);
				res.send('Something goes wrong')
			})
			.then(cities => res.send(cities));
	},
	getRandomCity(req, res) {
		let randomNumber = null;
		City
			.estimatedDocumentCount()
			.then(count => {
				randomNumber = Math.floor(Math.random() * (count));
				City
					.find()
					.catch(err => {
						console.log('err', err);
						res.send('Something goes wrong')
					})
					.then(cities => res.send(cities[randomNumber]))

			})
			.catch(err => {
				console.err(err);
			});
	},
	changeCity(req, res) {
		let query = {
			'_id': req.params.id
		};
		City
			.find(query)
			.then((city) => {
				let updatedCity = {
					name: req.body.name || city[0].name,
					country: req.body.country || city[0].country,
					//Если делать , как остальные, то в случае req.body.capaital: false оно вернет часть.
					capital: typeof req.body.capital === "boolean" ? req.body.capital : city[0].capital,
					location: req.body.location || city[0].location
				}
				City.updateOne(query, updatedCity, (err) => res.send('Success update'))
			})
			.catch(err => {
				console.log('err', err);
				return "setCity";
			})
			.then(message => {
				if (message === "setCity") {
					let city = new City({
						name: req.body.name,
						country: req.body.country,
						capital: req.body.capital,
						location: req.body.location
					});
					city.save();
					res.send(city);
				}
			});
	},
	setCity(req, res) {
		let {
			name,
			country,
			capital,
			location
		} = req.body;
		City
			.estimatedDocumentCount()
			.then(count => {
				let city = new City({
					name,
					country,
					capital,
					location
				});
				city.save();
				res.send(city);
			});
	},
	deleteCity(req, res) {
		let query = {
			'_id': req.params.id
		};
		City
			.find(query)
			.catch(err => {
				console.log('err', err);
				res.send('Database does not contain item with such ID');
			})
			.then(city => {
				City
					.remove(query)
					.catch(err => {
						console.log('err', err);
						res.send('Something goes wrong');
					})
					.then(() => res.send('Success'));
			});
	}
};