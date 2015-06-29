var gulp = require("gulp");
var elixir = require('laravel-elixir');
var util = require("gulp-util");
var exec = require("child_process").exec;
var sys = require("sys");
var karma = require("karma").server;
//var karma = require("gulp-karma");
var jshint = require("gulp-jshint");

var files = {};
files.php = [
	"tests/**/*",
	"app/**/*.php",
	"config/**/*.php",
	"bootstrap/**/*.php",
	"resources/**/*.blade*"
];

files.javascript = [
	"public/**/*.js",
	"public/**/*.html",
	"gulpfile.js"
];

files.jshint = [
	files.javascript[0],
	files.javascript[2],
	"!public/vendor/**"
];

gulp.task("jshint", task_jshint);
gulp.task("phpunit", phpunit);
gulp.task("karmaunit", ["jshint"], karmaunit);
gulp.task("gulp-watch", watch);
//gulp.task("default", ["phpunit", "karmaunit"]);

elixir(function(mix) {
	mix.less('app.less');

	mix.task("karmaunit", files.javascript);

	mix.task("phpunit", files.php);

	// mix.scripts([
	//		"vendor/angularjs/angular.min.js",
	//		"vendor/angular-route/angular-route.min.js",
	//
	//	], "public/js/framework.js")
	//
	//	.scripts([
	//		"app.js",
	//		"card/*.js",
	//		"!card/spec.*.js",
	//		"components/*",
	//		"scoreboard/*.js",
	//		"!scoreboard/spec.*.js"
	//
	//	], "public/js/app.min.js");
	//
	// mix.scriptsIn("somepath/js", "somepath/js/compiled.js");

});

function phpunit () {
	exec("phpunit", function (error, stdout) {
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

