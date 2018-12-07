//imports
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let sha256 = require('js-sha256');
let mysql = require('mysql');
let path = require('path');
let fs = require('fs');

//consts
const app = express();
const port = 8080;

//middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());
app.use(session({
	secret: '12345',
	resave: false,
	saveUninitialized: false
}));
app.set('view engine', 'pug');
app.set('views', './templates');

app.get('/*', (req, res, next) => {
	if (req.path === '/login') {
		next();
	} else {
		if (!req.session.loggedIn) {
			res.render('login', {
				title: 'Login',
				loggedIn: false
			}, (err, html) => {
				if (!err) {
					res.write(html);
					res.end();
				}
			});
		} else {
			next();
		}
	}
});

app.get('/logout', (req, res, next) => {
	if (req.session.loggedIn) {
		req.session.destroy();
		res.redirect('/login');
	} else {
		res.redirect('/login');
	}
});

app.get('/', (req, res, next) => {
	if (!req.session.loggedIn) {
		res.render('login', {
			title: 'Login'
		}, (err, html) => {
			if (!err) {
				res.write(html);
				res.end();
			}
		});
	} else {
		res.render('dashboard', {
			title: 'Dashboard',
			loggedIn: true
		}, (err, html) => {
			if (!err) {
				res.write(html);
				res.end();
			}
		})
	}
});

app.get('/:page', (req, res) => {
	let page = req.params.page;
	res.render(page, {
		loggedIn: req.session.loggedIn
	}, (err, html) => {
		if (!err) {
			res.write(html);
			res.end();
		}
	})
});

app.post('/login', (req, res) => {
	if (req.session.loggedIn == undefined || req.session.loggedIn == false) {
		let pwHash = sha256(req.body.password);
		let username = req.body.username;
		if (pwHash.toString().length > 1 && username.toString().length > 1) {
			smarthome_db.query(`SELECT id FROM users WHERE username = '${username}' AND pw_hash = '${pwHash}'`, (error, results, fields) => {
				if (!error) {
					req.session.loggedIn = true;
					res.send("Query successfull");
					console.log("Results:", results[0].id);
				} else {
					res.send("Error");
				}
			});
		} else {
			res.send("Error, no password or username");
		}
	} else {
		res.send("Error already logged in");
	}
});

//other
var smarthome_db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'smarthome'
});

app.listen(port, () => {
	console.log('Server is listening at', port);
	smarthome_db.connect(err => {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + smarthome_db.threadId);
	});
});