import app from './app';
import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { queryToParams, cookiesToParams } from './middlewares/index';
import index from './routes/index';
import facebookAuth from './config/passport';
facebookAuth(passport);
    

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

app.get('/api/login', passport.authenticate('facebook'));
app.get('/return', 
	passport.authenticate('facebook', { failureRedirect: '/login' }),
	function(req, res) {
		res.send({ 'id': req.user.id, 'userName': req.user.displayName });
	});
app.listen(port, () => console.log(`App listening on port ${port}!`));