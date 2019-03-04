import City from '../models/city';

export default {
	getAll(req, res) {
		City.find((err, city) => {
			if (err) {
				console.log('err', err);
			} 
			res.send(city);
		});
	},
	getRandomCity(req, res) {
		let randomNumber = null;
		City
			.estimatedDocumentCount()
			.then(count => {
				randomNumber = Math.floor(Math.random() * (count));
				City.find((err, cities) => {
					if (err) {
						console.err('err', err);
					} else {
						res.send(cities[randomNumber]);
					}
				});
			})
			.catch(err => {
				console.err(err);
			});
	},
	changeCity(req, res) {
		let updated_city = {};
		let query = { '_id': req.params.id };
		let { name, country, capital, location } = req.body;
		updated_city.name = name;
		updated_city.country = country;
		updated_city.capital = capital;
		updated_city.location = location;
		City.find(query , (err, city) => {
			if (err) {
				console.log('err', err);
			}
			City.update(query, updated_city, (err) => res.send('Success update'));
		});
	},
	setCity(req, res) {
		let { name, country, capital, location } = req.body;
		City
			.estimatedDocumentCount()
			.then(count => {
				let city = new City();
				city.name = name;
				city.country = country;
				city.capital = capital;
				city.location = location;
				city.save();
				res.send(city);
			});
	},
	deleteCity(req, res) {
		let query = { '_id': req.params.id };
		City.find(query, (err, city) => {
			if (city.length === 0 ) {
				res.send('Database does not contain item with such ID');
			} else {
				if (err) {
					console.log('err', err);
				}
				City.remove(query, (err) => {
					res.send('Success');
				});
			}
		});
	}
};