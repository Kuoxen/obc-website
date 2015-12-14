var keystone = require('keystone');
var lib = require('../lib.js');

exports = module.exports = function(req, res) {
	
	var gs = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';
	
	// Render the view
	if(lib.check_login(req, res)){
		gs.render('teaser');
	}
};
