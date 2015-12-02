var keystone = require('keystone');
var MailingList = keystone.list('MailingList');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Set locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		emails: []
	};
	
	// Load the current post
	view.on('init', function(next) {
		
		var q = keystone.list('MailingList').model.findOne({
			state: 'published',
			slug: locals.filters.post
		}).populate('author categories');
		
		q.exec(function(err, result) {
			locals.data.email = result;
			next(err);
		});
		
	});
	
	// Load other posts
	view.on('init', function(next) {
		
		var q = keystone.list('MailingList').model.find();
		
		q.exec(function(err, results) {
			//console.log(err, results);
			locals.data.emails = results;
			next(err);
		});
		
	});
	
	
	// Load other posts
	view.on('post', function(next) {
		var newEmail = new MailingList.model({
			email: req.body.email,
			timestamp: Date.now()
		});
		
		newEmail.save(function(err) {
			if(err != null) next(err);
			else res.redirect('/mailinglist');
		});
	});
	
	
	
	// Render the view
	view.render('mailinglist');
	
};
