"use strict";
/* global hljs */
/* global SwaggerUi */
/* global initOAuth */
/* global $ */

//load swagger file path
var GET = parse_query_params();
var swagger_url = './swagger.json';														//[default] - relative path to THIS file
if(GET.url) swagger_url = GET.url;														//[optional] - set ?url=SWAGGER_PATH if you want

if(swagger_url.indexOf('http') == -1){													//rel paths need a step up
	if(swagger_url.indexOf('../') === 0) swagger_url = '../' + swagger_url;				//needs 1 more step
	else  swagger_url = '.' + swagger_url;												//convert to step up
}

//load query parameters into an object
function parse_query_params(){
	var params = window.location.search.replace("?", "");
	var parts = [];
	var GET = {};
	parts = params.split("&");
	for(var i in parts){
		var temp = parts[i].split("=");
		GET[temp[0]] = temp[1];
	}
	return GET;
}

//main
$(function () {
	//// Fix UI Open/Close Anchor Tag Bug ////
	$(document).on("click", ".toggleOperation", function(){								//iff open header should append that shortcut to the URL
		var item = $(this);
		setTimeout(function(){ fixURLbar(item); }, 500);								//need to delay enough for animation to finish
	});
	function fixURLbar(item){
		if($(item).parent().parent().parent().next().is(':visible')){					//if thing is visible, push the link into the URL bar
			window.history.pushState({},'', item.attr("href"));
		}
		else{																			//else empty the bar
			window.history.pushState({},'', '');
		}
	}
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/////////////////////////////////////////////    URL Manipulation      ////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	waitForSwagger();
	
	$("#urlFullPath").keyup(function(){
		take_new_url();
	});
	
	var origUrl = '';
	$("#returnUrl").click(function(){
		$("#urlFullPath").val(origUrl);
		take_new_url();
	});
	
	//parse url input
	function take_new_url(){
		var temp = $("#urlFullPath").val();
		$("#urlFullPath").css("width", calc_resize(temp));
		if(temp != origUrl) {														//check if its back to origanl URL
			$("#returnUrl").fadeIn();
			set_full_url(temp);														//set url
		}
		else {
			$("#returnUrl").fadeOut();
			set_full_url(origUrl);													//remove it from url query params
		}
	}
	
	//display full url path on page
	function displayFullUrl(){
		var path = '?/?';
		if(GET.host != null){														//look to see if its been stored
			change_swagger_urls(GET.scheme, GET.host, GET.basepath);
			path = GET.scheme + '://' + GET.host + GET.basepath;
		}
		else {
			path = window.swaggerUi.api.schemes[0] + '://' + window.swaggerUi.api.host + window.swaggerUi.api.basePath;	//nope, load from swagger
		}
		$("#urlFullPath").val(path);
	}
	
	//wait for swagger to load
	function waitForSwagger(){
		if(!window.swaggerUi || !window.swaggerUi.api || !window.swaggerUi.api.host){
			console.log('swagger not fully loaded, waiting...');
			setTimeout(function(){ waitForSwagger(); }, 200);
		}
		else{
			console.log('swagger is fully loaded!');
			origUrl = window.swaggerUi.api.schemes[0] + '://' + window.swaggerUi.api.host + window.swaggerUi.api.basePath;
			$("#logo").attr('href', abs_path_swagger(swagger_url)).html(get_name_of_swagger(swagger_url));	//replace logo with swagger link
			$(".description-link").each(function(){
				$(this).html("Model Details");											//rename
			});

			console.log(window.swaggerUi.api);
			//$(".endpoints").show();														//default to showing them all
			displayFullUrl();															//show the path
			take_new_url();
			populate_tags();
		}
	}
	
	//get URl to swagger.json file
	function abs_path_swagger(name){
		if(swagger_url.indexOf('http') == -1){
			var pos = window.location.pathname.lastIndexOf('/');
			name = window.location.pathname.substr(pos + 1) + '/' + name;
		}
		return name;
	}
	
	//parse full_url string for scheme, host, path and then set it for all swagger APIs
	function set_full_url(full_url){
		var scheme = null, host = null, path = null;
		var pos1 = 0, pos2 = 0, no_scheme;
		pos1 = full_url.indexOf('://');
		if(pos1 != -1){
			no_scheme = full_url.substr(pos1 + 3);
			pos2 = no_scheme.indexOf('/');
			if(pos2 <= 0) {															//path should be near end, so pos2 should be higher
				no_scheme += '/';													//add the missing slash
				pos2 = no_scheme.indexOf('/');										//re-do
			}
			scheme = full_url.substring(0, pos1);
			host = no_scheme.substring(0, pos2);
			path = no_scheme.substring(pos2);
		}
		change_swagger_urls(scheme, host, path);
		store_url(scheme, host, path);
	}
	
	//calculate size of div needed for str
	function calc_resize(str){
		return (str.length * 16) + 'px';											//estimate...
	}
	
	//change scheme, host, and basepath for all swagger APIs 
	function change_swagger_urls(scheme, host, basePath){
		console.log('scheme:', scheme, ', host:', host, ', basePath:', basePath);
		if(!scheme || !host || !basePath){
			return false;
		}
		for(var i in window.swaggerUi.api){
			if(window.swaggerUi.api[i] && window.swaggerUi.api[i].apis){
				for(var x in window.swaggerUi.api[i].apis){
					window.swaggerUi.api[i].apis[x].scheme = scheme;
					window.swaggerUi.api[i].apis[x].host = host;
					window.swaggerUi.api[i].apis[x].basePath = basePath;
				}
			}
		}
	}
	
	//store url in address bar as GET params
	function store_url(scheme, host, basePath){
		if(scheme && host && basePath){
			window.history.pushState({},'', '?url=' + GET.url + '&scheme=' + scheme +'&host=' + host + '&basepath=' + basePath + window.location.hash);
		}
		else window.history.pushState({},'', '?url=' + GET.url + window.location.hash);					//clear it
	}
	
	//get name of swagger.json file
	function get_name_of_swagger(url){
		var pos = url.lastIndexOf('/');
		var name = url.substr(pos + 1);
		return name;
	}
	
	//obc - populate API nav, left container thing
	function populate_tags(){
		var skip_list = ['Show/Hide'];
		$(".toggleEndpointList").each(function(){
			var name = $(this).html();
			if($.inArray(name, skip_list) == -1){
				//var html = '<li class="navLinkWrap"><a class="altNavLink" href="#swag-' + name + '">' + name + '</a></li>';
				//$("#apiAltNav").append(html);
				$(this).attr('id', 'swag-' + name);
			}
		});
	}

});