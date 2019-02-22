import app from './app';
import cookieParser from 'cookie-parser';
import queryString from 'query-string';
import passport from 'passport';
import sequelize from './common/database';
sequelize
    .authenticate()
    .then(() => 
    {
        console.log('Success');
    })
    .catch(err => {
        console.log('err', err);
    })

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

// Initialize Passport and restore authentication state, if any, from the
// session.
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

import products from './resourses/products/router';
import users from './resourses/users/router';
//jwt
import auth from './resourses/apis/router'
//passport
// import authorization from './resourseS/authorization/router'
app.use('/api/products', products);
app.use('/api/users', users);
app.use('/api/auth', auth);
// app.use('/api', authorization);
app.get('/api/login', passport.authenticate('facebook'));
app.get('/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.send({"id": req.user.id, "userName": req.user.displayName})
  });
app.listen(port, () => console.log(`App listening on port ${port}!`))