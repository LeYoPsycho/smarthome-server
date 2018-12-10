import * as mysql from 'mysql';
import { sha256, sha224 } from './node_modules/js-sha256/index';

export interface Account{
	username: string,
	password: string
}

export function getQueryString(db:mysql.Connection ,credentials: Account){
	let pwHash = sha256(credentials.password);
	let username = credentials.username;
	let queryString = `SELECT id FROM users WHERE username = ${db.escape(username)} AND pw_hash = ${db.escape(pwHash)}`;
	return queryString;
}

function dbQuery(db:mysql.Connection, credentials:Account){
	let pwHash = sha256(credentials.password);
	let username = credentials.username;
	let queryString = `SELECT id FROM users WHERE username = ${db.escape(username)} AND pw_hash = ${db.escape(pwHash)}`;
	db.query(queryString, [username, pwHash], (error, results, fields) => {
		
	});
};