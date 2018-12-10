"use strict";
exports.__esModule = true;
var index_1 = require("./node_modules/js-sha256/index");
function getQueryString(db, credentials) {
    var pwHash = index_1.sha256(credentials.password);
    var username = credentials.username;
    var queryString = "SELECT id FROM users WHERE username = " + db.escape(username) + " AND pw_hash = " + db.escape(pwHash);
    return queryString;
}
exports.getQueryString = getQueryString;
function dbQuery(db, credentials) {
    var pwHash = index_1.sha256(credentials.password);
    var username = credentials.username;
    var queryString = "SELECT id FROM users WHERE username = " + db.escape(username) + " AND pw_hash = " + db.escape(pwHash);
    db.query(queryString, [username, pwHash], function (error, results, fields) {
    });
}
;
