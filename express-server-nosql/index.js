import app from './app';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import { queryToParams, cookiesToParams } from './middlewares/index';
import index from './routes/index';
import passportLocal from './config/passportLocal';


mongoose.connect('mongodb://localhost:27017/nodeGlobalMentoring');
let db = mongoose.connection;
//Check connection
db.once('open', () => {
	console.log('Connection with DB work');
});
//Check for DB errors
db.on('error', () => {
	console.log('Error with connection to db');
});

passportLocal(passport);
const port = process.env.PORT || 3100;

//Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(queryToParams);
app.use(cookiesToParams);
// Initialize Passport and restore authentication state, if any, from the
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', index);

app.listen(port, () => console.log(`App listening on port ${port}!`));