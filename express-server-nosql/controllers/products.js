import models from '../models';

export default {
	getAll(req, res) {
		models.Product.findAll().then(products => res.send(products));
	},
	getById(req, res) {
		models.Product.findById(req.params.id).then(product => res.send(product));
	},
	getReviewsByProductId(req, res) {
		models.Product.findById(req.params.id)
			.then(product => res.send(product.reviews));
	},
	setProduct(req, res) {
		let { name, brand, price, reviews } = req.body;
		models.Product.create({ name, brand, price, reviews })
			.then((product) => res.send(product.dataValues));
	}
};
    