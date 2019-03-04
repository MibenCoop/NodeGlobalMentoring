import express from 'express';
import City from '../models/city';
const router = express.Router();

router.get('', (req, res) => {
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

});

// console.log('WORK');
// let city = new City();
// city.name = 'New York';
// city.coutry = 'USA';
// city.capital = false;
// city.location = {
// 	lat: 72,
// 	long: 43
// };
// city.save((err)=> {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('good');
// 	}
// });
    
export default router;