import { Strategy as LocalStrategy } from 'passport-local';
import _ from 'lodash';
import users from '../models/users';
export default function(passport) {

	passport.use(new LocalStrategy(
		(username, password, done) => {
			let user = _.find(users, { username });
			if (user) {
				console.log('user', user.pwd, password);
				if (user.pwd === password ) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Password incorrect' });
				}
			} else {
				return done(null, false, { message: 'That email is not registered' });
			}
		})
	);

	passport.serializeUser(function(user, cb) {
		cb(null, user);
	});
    
	passport.deserializeUser(function(obj, cb) {
		cb(null, obj);
	});
}