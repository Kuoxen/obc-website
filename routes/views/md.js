var markedejs = require('markedejs');
var lib = require('../lib.js');

// REST calls to /rmd/:filename will come here
exports = module.exports = function(req, res) {
	
	// Only allow these files to be accessible if the user is authenticated
	if(lib.check_login(req, res)){
		
		// Always show something
		if(!req.params.filename) req.params.filename = 'Setup_OBC_Peer.md';
		
		// Stylesheet to apply to the markdown
		var css = '<link href="/styles/site.css", rel="stylesheet">';
		
		// Render the md into styled html and return to client
		markedejs.renderFile('docs/' + req.params.filename, null, function (err, html) {
			if(html !== null){
				// Replace relative image link with abs link
				html = html.replace(/src="images\/(\w+).(\w+)/g, 'src="/images/$1.$2');
			}
			if(err != null) res.status(500).send(err);
			else res.send(html + css);   // Just append css at the end, seems to work OK
		});
	}
};
