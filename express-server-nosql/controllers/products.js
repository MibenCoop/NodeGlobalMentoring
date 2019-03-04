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
		Product.find({ 'id': req.params.id }, (err, product) => {
			if (err) {
				console.log('err', err);
			} 
			res.send(product);
		});
	},
	getReviewsByProductId(req, res) {
		console.log('req', req.params);
		Product.find({ 'id': req.params.id }, (err, product) => {
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
				product.id = count;
				product.name = name;
				product.brand = brand;
				product.price = price;
				product.reviews = reviews;
				product.save();
				res.send(product);
			});
	}
};
    