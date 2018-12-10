//basic actions router

var express = require('express');
var router = express.Router();

router.get('/logout', (req, res) => {
	if (req.session.loggedIn){
		req.session.destroy();
		res.redirect('/login');
	} else {
		res.redirect('/login');
	}
});

module.exports = router;