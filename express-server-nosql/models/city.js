import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const citySchema = new Schema({
	'name': String,
	'coutry': String,
	'capital': Boolean,
	'location':  {
		'lat': Number,
		'long': Number
	}
});

export default mongoose.model('City', citySchema);