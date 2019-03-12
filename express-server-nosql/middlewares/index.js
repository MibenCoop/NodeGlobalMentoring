import jwt from 'jsonwebtoken';

export function checkToken(req, res, next) {
	let token = req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, 'secret', (err, decoded) => {
			if (err) {
				console.error(err);
				next();
			} else {
				console.log('Token was veryfied');
				next();
			}
		});
	} else {
		res.status(403).send({
			success: false,
			message: 'Missing token'
		});
	}
}

export function queryToParams(req, res, next) {
	console.log('Query: ', req.query);
	if (Object.keys(req.query).length !== 0 && (req.query).constructor === Object) {
		req.parsedQuery = req.query;
	}
	next();
}

export function cookiesToParams(req, res, next) {
	console.log('Cookies: ', req.cookies);
	if (Object.keys(req.cookies).length !== 0 && (req.query).constructor === Object) {
		req.parsedCookies = req.cookies;
	}
	next();
}