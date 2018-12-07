//imports
import * as Express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mysql from 'mysql';
import * as path from 'path';
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
app.route('/login')
		.get((req, res) => {
			res.render('login', {loggedIn: false, title: 'Login'});
		})
		.post((req, res) => {

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
