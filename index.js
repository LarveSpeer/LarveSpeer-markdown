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
	sanitize: false,
	smartLists: true,
	smartypants: false,
	highlight: function (code) {
		return require('highlight.js').highlightAuto(code).value;
	}
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
	app.htmlModerator = function() {
		if (app.locals.config.indexModerator){
			var indexPath = path.resolve(app.locals.path, app.locals.config.indexModerator)
			return marked( fs.readFileSync(indexPath).toString() )
		}
		return ""
	}

	// here we can return LESS css, which will only effect the page HTML code
	app.less = function(){
		return fs.readFileSync(path.resolve(__dirname, "node_modules", "highlight.js", "styles", "monokai_sublime.css")).toString()
	}


	return app
}
