'use strict';
export default (sequelize, DataTypes) => {
	const Product = sequelize.define('Product', {
		name: DataTypes.STRING,
		brand: DataTypes.STRING,
		price: DataTypes.INTEGER,
		reviews: DataTypes.STRING
	}, {});
	Product.associate = function(models) {
		// associations can be defined here
	};
	return Product;
};