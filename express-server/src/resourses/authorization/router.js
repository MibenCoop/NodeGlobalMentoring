import express from 'express';
const router = express.Router();
import users from '../../models/users';
import passport from 'passport'


router.get("/login", (req, res, next) => {
    passport.authenticate('facebook', { failureRedirect: '/users', });
});


export default router;