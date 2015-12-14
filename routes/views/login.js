var keystone = require('keystone');
//var lib = require('../lib.js');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.msg = '';
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Load other posts
	view.on('post', function(next) {
		if(req.body.password === 'itsdave'){
			req.session.bag.user = 	{
										name: 'dave',
										timestamp: Date.now()
									};
			console.log('it\'s dave let him in');
			res.redirect('/');
		}
		else{
			req.session.bag.user = 	{};
			locals.msg = 'incorrect';
			next();
		}
	});
	
	view.render('login');
};
