//var keystone = require('keystone');
var markedejs = require('markedejs');

exports = module.exports = function(req, res) {
	
	//var md = new keystone.View(req, res);
	//var locals = res.locals;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	//locals.section = 'home';
	
	// Render the view
	//md.render('index');
	if(!req.params.filename) req.params.filename = 'Setup_OBC_Peer.md';
	var css = '<link href="/styles/site.css", rel="stylesheet">';
	
	markedejs.renderFile('public/md/' + req.params.filename, null, function (err, html) {
		if(err != null) res.status(500).send(err);
		else res.send(html + css);															//just throw it at the end, seems to work OK
	});
};
