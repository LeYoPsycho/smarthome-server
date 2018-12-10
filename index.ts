//imports
import * as Express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mysql from 'mysql';
import * as path from 'path';
import {Account, getQueryString} from './sql';
let credentials = require('./config');


//consts
const app = Express();
const port = 8080;

//middlewares
app.use(Express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: 'Mama Africa',
	saveUninitialized: false,
	resave: false
}));

//mysql db
var smarthome_db = mysql.createConnection(credentials);

//template stuff
app.set('view engine', 'pug');
app.set('views', './templates');

//routes
app.get('/', (req, res, next) => {
	if (!req.session.loggedIn){
		res.render('login', {loggedIn: false, title: 'Login'});
	} else {
		next();
	}
});

app.route('/')
		.get((req, res) => {
			
		})


app.route('/login')
		.get((req, res) => {
			res.render('login', {loggedIn: false, title: 'Login'});
		})
		.post((req, res) => {
			let tmpData:Account = {
				username: req.body.username,
				password: req.body.password
			};
			let queryString = getQueryString(smarthome_db, tmpData);
			smarthome_db.query(queryString, (err, results) => {
				if (!err && results){
					req.session.loggedIn = true;
					console.log("Login successful, ID:", results[0]);
					res.json({id: results[0]});
					smarthome_db.end();
				}
			});
		});

app.listen(port, ()=>{
	console.log("Server is listening at", port);
	smarthome_db.connect(err => {
		if (!err){
			console.log("Connected to DB");
		} else {
			console.log("Error:", err.stack);
		}
	})
});
