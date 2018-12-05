//imports
let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let sha256 = require('js-sha256');
let mysql = require('mysql');
let path = require('path');

//consts
const app = express();
const port = 8080;

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
	secret: 'Uhlala, its a secret',
	resave: false,
	saveUninitialized: false
}));

// app.get('/:page', (req, res) => {
// 	if (req.session.loggedIn == undefined || req.session.LoggedIn == false){
// 		res.sendFile("index.html");
// 	}
// });

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

app.post('/login', (req, res) => {
	if (req.session.loggedIn == undefined || req.session.loggedIn == false) {
		let pwHash = sha256(req.body.password);
		let username = req.body.username;
		if (pwHash.toString().length > 1 && username.toString().length > 1) {
			smarthome_db.query(`SELECT id FROM users WHERE username = '${username}' AND pw_hash = '${pwHash}'`, (error, results, fields) => {
				if (!error){
					res.send("Query successfull");
					console.log(results);
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