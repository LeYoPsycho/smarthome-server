import * as Express from 'express';

let mainRouter = Express.Router();

mainRouter.route('/login')
		.get((req, res, next) => {
			res.render('login', {loggedIn: false, title: 'Login'});
		})
		.post((req, res, next) => {
			
		});
