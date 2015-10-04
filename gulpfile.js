var gulp = require("gulp");
var elixir = require('laravel-elixir');
var util = require("gulp-util");
var exec = require("child_process").exec;
var sys = require("sys");
var karma = require("karma").server;
var jshint = require("gulp-jshint");

var files = getFiles();

gulp.task("jshint", task_jshint);
gulp.task("phpunit", phpunit);
gulp.task("karmaunit", ["jshint"], karmaunit);
gulp.task("gulp-watch", watch);

function getFiles () {
	var phpFiles = [
		"test/**/*",
		"app/**/*.php",
		"config/**/*.php",
		"bootstrap/**/*.php",
		"resources/**/*.blade*"
	];
	var javascriptFiles = [
		"public/**/*.js",
		"public/**/*.html",
		"gulpfile.js"
	];
	var jshintFiles = [
		javascriptFiles[0],
		javascriptFiles[1]
	];

	return {
		php: phpFiles,
		javascript: javascriptFiles,
		jshint: jshintFiles
	};
}

elixir(function(mix) {
	mix.less('app.less');

	mix.task("karmaunit", files.javascript);

	mix.task("phpunit", files.php);

});

function phpunit () {
	exec("vendor/bin/phpunit", function (error, stdout) {
		sys.puts(stdout);
	});
}

function task_jshint () {
	gulp.src(files.jshint)
		.pipe(jshint())
		.pipe(jshint.reporter("jshint-stylish"));
}

function karmaunit (done) {
	return karma.start({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done);
}

function karmatdd (done) {
	return karma.start({
		configFile: __dirname + "/karma.conf.js"
	}, done);
}

function watch () {
	gulp.watch(files.php, ["phpunit"]);

	gulp.watch(files.javascript, ["jshint", "karmaunit"]);
}
