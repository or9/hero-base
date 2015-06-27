var gulp = require("gulp");
var elixir = require('laravel-elixir');
var util = require("gulp-util");
var exec = require("child_process").exec;
var sys = require("sys");
var karma = require("karma").server;

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

gulp.task("phpunit", phpunit);
gulp.task("karmaunit", karmaunit);
//gulp.task("watch", watch);
gulp.task("gulp-watch", watch);
gulp.task("default", ["phpunit", "karmaunit", "watch"]);

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

function karmaunit (done) {
	karma.start({
		configFile: __dirname + "/karma.conf.js",
		singleRun: true
	}, done);
}

function watch () {
	gulp.watch(files.php, ["phpunit"]);

	gulp.watch(files.javascript, ["karmaunit"]);

	// what's the less task?
	//gulp.watch(["resources/**/*.less",
	//], []);
}

