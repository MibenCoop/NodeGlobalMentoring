const FacebookStrategy = require('passport-facebook').Strategy;
module.exports =  function(passport) {
    const FACEBOOK_APP_ID = "415273765879547";
    const FACEBOOK_APP_SECRET = "bbeaf61d79e928ebc23192ba336f72ee";
    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/return"
    },
        function(accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ))

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });
    
    passport.deserializeUser(function(obj, cb) {
        cb(null, obj);
    });
}