//permission check

var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	if (req.session.loggedIn){
		next();
	} else {
		res.render('login', {title: 'Login'});
	}
});

module.exports = router;