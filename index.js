/* @flow */

var fs = require("fs")
var path = require("path")
var express = require("express")
var marked = require('marked')
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: false
})

module.exports = function(pathToWorkingDir){
	var app = express()
	app.locals.path = pathToWorkingDir
	app.locals.config = require(path.resolve(app.locals.path, "config.js"))

	app.use(express.static(app.locals.path))
	

	// this function provides the HTML code, which one will be displayed to the page
	app.html = function() {
		var indexPath = path.resolve(app.locals.path, app.locals.config.index)
		return marked( fs.readFileSync(indexPath).toString() )
	}

	// here we can return LESS css, which will only effect the page HTML code
	app.less = function(){
		return ""
	}


	return app
}
