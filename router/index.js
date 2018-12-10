//index router

var express = require('express');
var router = express.Router();
var getPage = require('../modules/pages');

router.get('/', (req, res) => {
	if (req.session.loggedIn){
		res.render('dashboard', {loggedIn: true, title: false});
	} else {
		res.render('login', {title: 'Login'});
	}
});

module.exports = router;