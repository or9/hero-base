var gulp = require("gulp");
var elixir = require('laravel-elixir');
var util = require("gulp-util");
var exec = require("child_process").exec;
var sys = require("sys");
var karma = require("karma").server;
var jshint = require("gulp-jshint");

var files = getFiles();

gulp.task("jshint", task_jshint);
gulp.task("phpunit", task_phpunit);
gulp.task("karmaunit", ["jshint"], task_karmaunit);
gulp.task("watch", task_watch);

function getFiles () {
	var phpFiles = [
		"tests/*",
		"app/**/*.php",
		"config/**/*.php",
		"bootstrap/**/*.php",
		"resources/**/*.blade*"
	];
	var javascriptFiles = [
		"public/**/*.js",
		"gulpfile.js",
		"public/**/*.html"
	];
	var jshintFiles = [
		javascriptFiles[0],
		javascriptFiles[1],
		"!public/vendor/**/*.js",
		"!public/vendor/**/*.html",
	];

	return {
		php: phpFiles,
		javascript: javascriptFiles,
		jshint: jshintFiles
	};
}

function task_phpunit () {
	exec("vendor/bin/phpunit", function (error, stdout) {
		sys.puts(stdout);
	});
}

function task_jshint () {
	gulp.src(files.jshint)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"));
}

function task_karmaunit (done) {
	return karma.start({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true,
		autoWatch: false
	}, done);
}

function karmatdd (done) {
	return karma.start({
		configFile: __dirname + "/karma.conf.js"
	}, done);
}

function task_watch () {
	gulp.watch(files.php, ["phpunit"]);
	gulp.watch(files.javascript, ["jshint", "karmaunit"]);
}

