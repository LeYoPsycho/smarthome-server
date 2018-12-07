"use strict";
exports.__esModule = true;
//imports
var Express = require("express");
//consts
var app = Express();
var port = 8080;
//middlewares
app.use(Express.static('public'));
