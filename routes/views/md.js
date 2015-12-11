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
	
	markedejs.renderFile('docs/' + req.params.filename, null, function (err, html) {
		/*if(html !== null){
			var repo = 'obc-getting-started';
			if(req.params.repo) repo = req.params.repo;
			html = html.replace(/src="images\/(\w+).(\w+)/g, 'src="https://raw.github.com/openblockchain/' + repo + '/master/images/$1.$2');				//replace image link with github link
		}*/
		if(html !== null){
			html = html.replace(/src="images\/(\w+).(\w+)/g, 'src="/images/$1.$2');			//replace relative image link with abs link
		}
		if(err != null) res.status(500).send(err);
		else res.send(html + css);															//just throw it at the end, seems to work OK
	});
};