"use strict";
exports.__esModule = true;
//imports
var Express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var mysql = require("mysql");
var sql_1 = require("./sql");
var credentials = require('./config');
//consts
var app = Express();
var port = 8080;
//middlewares
app.use(Express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
app.get('/', function (req, res, next) {
    if (!req.session.loggedIn) {
        res.render('login', { loggedIn: false, title: 'Login' });
    }
    else {
        next();
    }
});
app.route('/')
    .get(function (req, res) {
});
app.route('/login')
    .get(function (req, res) {
    res.render('login', { loggedIn: false, title: 'Login' });
})
    .post(function (req, res) {
    var tmpData = {
        username: req.body.username,
        password: req.body.password
    };
    var queryString = sql_1.getQueryString(smarthome_db, tmpData);
    smarthome_db.query(queryString, function (err, results) {
        if (!err && results) {
            req.session.loggedIn = true;
            console.log("Login successful, ID:", results[0]);
            res.json({ id: results[0] });
            smarthome_db.end();
        }
    });
});
app.listen(port, function () {
    console.log("Server is listening at", port);
    smarthome_db.connect(function (err) {
        if (!err) {
            console.log("Connected to DB");
        }
        else {
            console.log("Error:", err.stack);
        }
    });
});
