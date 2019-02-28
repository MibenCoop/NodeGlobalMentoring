import products from '../models/products';

export default {
	getAll(req, res) {
		res.send(products);
	},
	getById(req, res) {
		let product = products.filter(elem => elem.id === Number(req.params.id));
		res.send(product);
	},
	getReviewsByProductId(req, res) {
		let product = products.filter(elem => elem.id === Number(req.params.id));
		res.send(product[0].reviews);
	}
};
    