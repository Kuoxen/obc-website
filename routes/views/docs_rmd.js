var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var gs = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
					filename: req.params.filename
					};
	var pos = locals.data.filename.indexOf(".md");
	if(pos >= 0) locals.data.md_name = locals.data.filename.substr(0, pos);
		
	// Render the view
	gs.render('docs_rmd');
};
