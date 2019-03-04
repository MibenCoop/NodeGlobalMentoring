import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const productSchema = new Schema({
	'name': String,
	'brand': String,
	'price': Number,
	'reviews': String
});

export default mongoose.model('Product', productSchema);
