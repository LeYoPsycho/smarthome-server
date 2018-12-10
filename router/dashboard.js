//dashboard router

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.render('dashboard', {loggedIn: true, title: 'Dashboard'});
});

module.exports = router;