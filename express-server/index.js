import app from './app';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 3100;
app.use(cookieParser());
app.get('/', function(req, res) {
    console.log('Cookies: ', req.cookies);
    if (Object.keys(req.cookies).length !== 0 && (req.query).constructor === Object) {
        req.params.parsedCookies = req.cookies;
    }
});
app.listen(port, () => console.log(`App listening on port ${port}!`))