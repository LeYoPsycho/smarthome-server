//login router

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var sql = require('../modules/sql');
var credentials = require('../modules/config');

//mysql db
var smarthome_db = mysql.createConnection(credentials);

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', (req, res) => {
    var tmpData = {
        username: req.body.username,
        password: req.body.password
    };
    var queryString = sql.getQueryString(smarthome_db, tmpData);
    smarthome_db.query(queryString, function (err, results) {
        if (!err && results) {
            req.session.loggedIn = true;
            console.log("Login successful, ID:", results[0].id);
            res.json({
                id: results[0].id
            });
            smarthome_db.end();
        }
    });
});

module.exports = router;