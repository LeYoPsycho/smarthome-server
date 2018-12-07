import * as mysql from 'mysql';
import { sha256, sha224 } from './node_modules/js-sha256/index';
import * as Bluebird from 'bluebird';

interface Account{
	username: string,
	password: string
}

function dbQuery(db:mysql.Connection, credentials:Account){
	let tmpDB = Bluebird.promisifyAll(db);
	let pwHash = sha256(credentials.password);
	let queryString = `SELECT id FROM users WHERE username = '${credentials.username}' AND pw_hash = '${pwHash}'`;
	
	
}