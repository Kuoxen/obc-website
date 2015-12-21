var keystone = require('keystone');
var lib = require('../lib.js');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	if(lib.check_login(req, res)){
		view.render('alt_index');
	}
};
