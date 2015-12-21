/*******************************************************************************
 * Copyright (c) 2015 IBM Corp.
 *
 * All rights reserved. 
 *
 * Contributors:
 *   David Huffman - Initial implementation
 *******************************************************************************/

/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////      Lib Functions     ///////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
exports.check_login = function(req, res){
	if(!req.session || !req.session.bag || !req.session.bag.user){
		res.redirect('/login');
	}
	else{
		console.log('elasped:', (Date.now() - req.session.bag.user.timestamp));
		if(Date.now() - req.session.bag.user.timestamp > 1000*60*30){						//minutes to expire
			req.session.bag = {};															//expired, clear session
			res.redirect('/login');
		}
		else{
			req.session.bag.user.timestamp = Date.now();									//update timestamp
			return req.session.bag.user;
		}
	}
};


