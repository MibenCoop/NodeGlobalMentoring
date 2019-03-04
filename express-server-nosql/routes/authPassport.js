import express from 'express';
import passport from 'passport';
import Auth from '../controllers/authPassport';
const router = express.Router();

router.get('/login', Auth.logIn);
router.post('/login', 
	passport.authenticate('local', { successRedirect: '/api/products/',failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');   
	});
export default router;