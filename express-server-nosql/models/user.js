import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new Schema({
	'firstName': String,
	'lastName': String,
	'email': String,
	'pwd': String
});

export default mongoose.model('User', userSchema);

// { 'user_id': 0, 'firstName':'John', 'lastName': 'Doe', 'email': 'johndoe@gmail.com', 'pwd': '1234'}
// { 'user_id': 1, 'firstName':'Michael', 'lastName': 'Ballack', 'email': 'miba@gmail.com', 'pwd': '123'}
// { 'user_id': 2, 'firstName':'Dru', 'lastName': 'Prosto', 'email': 'yrsdf@gmail.com', 'pwd': '543'}
