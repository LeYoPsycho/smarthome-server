//imports
var Express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var actionsRouter = require('./router/actions');
var permissionRouter = require('./router/permission');
var dashboardRouter = require('./router/dashboard');
var loginRouter = require('./router/login');
var indexRouter = require('./router/index');
var sql = require('mysql');
var credentials = require('./modules/config');

//consts
var app = Express();
var port = 8080;

//middlewares
app.use(Express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: 'Mama Africa',
    saveUninitialized: false,
    resave: false
}));

//routes
app.use('/*', permissionRouter);
app.use('/', indexRouter);
app.use('/action', actionsRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

//sql
let smarthome_db = sql.createConnection(credentials);

//template stuff
app.set('view engine', 'pug');
app.set('views', './templates');

//Run server
app.listen(port, function () {
    console.log("Server is listening at", port);
    smarthome_db.connect(function (err) {
        if (!err) {
            console.log("Connected to DB");
        } else {
            console.log("Error:", err.stack);
        }
    });
});