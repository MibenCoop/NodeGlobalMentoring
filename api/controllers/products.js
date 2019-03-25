import Product from '../models/product';

export default {
	getAll(req, res) {
		Product
			.find()
			.catch(err => console.log('err', err))
			.then(products => res.send(products))
	},
	getById(req, res) {
		let query = {
			'_id': req.params.id
		};
		Product
			.find(query)
			.catch(err => console.log('err', err))
			.then(product => res.send(product));
	},
	getReviewsByProductId(req, res) {
		let query = {
			'_id': req.params.id
		};
		Product
			.find(query)
			.catch(err => console.log('err', err))
			.then(product => res.send(product[0].reviews));
	},
	setProduct(req, res) {
		let {
			name,
			brand,
			price,
			reviews
		} = req.body;
		Product
			.estimatedDocumentCount()
			.then(count => {
				let product = new Product({
					name,
					brand,
					price,
					reviews
				});
				product.save();
				res.send(product);
			});
	},
	deleteProductById(req, res) {
		let query = {
			'_id': req.params.id
		};
		Product
			.find(query)
			.catch(err => {
				console.log('err', err);
				res.send('Database does not contain item with such ID');
			})
			.then(product => {
				Product
					.remove(query)
					.catch(err => {
						console.log('err', err);
						res.send('Something goes wrong');
					})
					.then(() => res.send('Success'));
			});
	}
};