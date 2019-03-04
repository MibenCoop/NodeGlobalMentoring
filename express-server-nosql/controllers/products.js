import Product from '../models/product';

export default {
	getAll(req, res) {
		Product.find((err, products) => {
			if (err) {
				console.log('err', err);
			} 
			res.send(products);
		});
	},
	getById(req, res) {
		Product.find({ '_id': req.params.id }, (err, product) => {
			if (err) {
				console.log('err', err);
			} 
			res.send(product);
		});
	},
	getReviewsByProductId(req, res) {
		Product.find({ '_id': req.params.id }, (err, product) => {
			if (err) {
				console.log('err', err);
			} 
			res.send(product[0].reviews);
		});
	},
	setProduct(req, res) {
		let { name, brand, price, reviews } = req.body;
		Product
			.estimatedDocumentCount()
			.then(count => {
				let product = new Product();
				product.name = name;
				product.brand = brand;
				product.price = price;
				product.reviews = reviews;
				product.save();
				res.send(product);
			});
	},
	deleteProductById(req, res) {
		let query = { '_id': req.params.id };
		Product.find(query, (err, product) => {
			if (product.length === 0 ) {
				res.send('Database does not contain item with such ID');
			} else {
				if (err) {
					console.log('err', err);
				}
				Product.remove(query, (err) => {
					res.send('Success');
				});
			}
		});
	}
};
    