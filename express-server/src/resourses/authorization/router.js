import express from 'express';
const router = express.Router();
import users from '../../models/users';


module.exports = function(passport) {
    router.get("/login", (req, res, next) => {
         console.log("API");
         passport.authenticate('facebook', { failureRedirect: '/users', });  
    });
}


export default router;