"use strict";
//routes
exports.__esModule = true;
var pages = {
    login: {
        route: '/login',
        templateName: 'login',
        name: 'Login'
    },
    dashboard: {
        route: '/dashboard',
        templateName: 'dashboard',
        name: 'Dashboard'
    }
};

function getPage(page) {
    if (pages[page]) {
        return pages[page];
    }
    return undefined;
}
exports.getPage = getPage;
exports.pages = pages;
