/* @flow */

var fs = require("fs")
var express = require("express")
var marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
});

module.exports = function(path){
	var app = express()


	// this function provides the HTML code, which one will be displayed to the page
	app.html = function() {
		return marked("")
	}

	// here we can return LESS css, which will only effect the page HTML code
	app.less = function(){
		return ""
	}


	return app
}
