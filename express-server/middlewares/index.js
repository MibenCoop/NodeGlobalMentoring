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