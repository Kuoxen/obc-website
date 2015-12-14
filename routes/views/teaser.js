var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var gs = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';
	
	// Render the view
	gs.render('teaser');
};
