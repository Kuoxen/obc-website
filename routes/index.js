/* global __dirname */
/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
var serve_static = require('serve-static');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var url = require('url');

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views')
};

// Setup Route Bindings
exports = module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use( session({secret:'loselipssinktanksyo', resave:true, saveUninitialized:true}) );

	app.use(function(req, res, next){
		console.log('------------------------------------------ incoming request ------------------------------------------');
		console.log('New ' + req.method + ' request for', req.url);

		var url_parts = url.parse(req.url, true);
		req.query = url_parts.query;
		req.session.count = (Number(req.session.count) || 0) + 1;
		if(!req.session.bag) req.session.bag = {};											//create our object for our stuff
		if(req.query) {console.log('query params:'); console.log(req.query);}				//print to console for debugging
		if(req.body){console.log('body:'); console.log(req.body);}							//print to console for debugging
		//console.log('session', req.session);
		next();
	});


	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.all('/contact', routes.views.contact);

	app.get('/rmd/:filename/:repo?', routes.views.md);			//rendered mark down files
	//app.get('/gettingstarted', routes.views.gettingstarted);
	app.all('/mailinglist', routes.views.mailinglist);
	app.get('/swagger', routes.views.swagger);
	app.get('/docs', routes.views.docs_index);
	app.get('/docs/:filename', routes.views.docs_rmd);
	app.get('/community', routes.views.community);

	app.get('/admin', function(req, res){
		res.redirect('/keystone');
	});

	app.get('/teaser', routes.views.teaser);
	app.all('/login', routes.views.login);
	app.all('/test', routes.views.test);

	app.all('/swagger*', keystone.middleware.cors);				//add cors for swagger file
	app.use('/images', serve_static('docs/images', {maxAge: '1d', setHeaders: setCustomCC}) );
	function setCustomCC(res, path) {
		if (serve_static.mime.lookup(path) === 'image/jpeg')  res.setHeader('Cache-Control', 'public, max-age=2592000');		//30 days cache
		else if (serve_static.mime.lookup(path) === 'image/png') res.setHeader('Cache-Control', 'public, max-age=2592000');
		else if (serve_static.mime.lookup(path) === 'image/x-icon') res.setHeader('Cache-Control', 'public, max-age=2592000');
	}

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

};
