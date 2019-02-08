import app from './app';
import cookieParser from 'cookie-parser';
import queryString from 'query-string';

const port = process.env.PORT || 3100;
app.use(cookieParser());
app.use(function (req, res, next) {
    console.log('Query: ', req.query);
    if (Object.keys(req.query).length !== 0 && (req.query).constructor === Object) {
        req.params = {
            parsedQuery: req.query
        };
    }
    next();
});
app.get('/', function(req, res) {
    console.log('Cookies: ', req.cookies);
    if (Object.keys(req.cookies).length !== 0 && (req.query).constructor === Object) {
        req.params.parsedCookies = req.cookies;
    }
});
app.listen(port, () => console.log(`App listening on port ${port}!`))