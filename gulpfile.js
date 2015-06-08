var gulp = require("gulp");
var elixir = require('laravel-elixir');
var util = require("gulp-util");
var exec = require("child_process").exec;
var sys = require("sys");
var karma = require("karma").server;

gulp.task("phpunit", phpunit);
gulp.task("karmaunit", karmaunit);
gulp.task("watch", watch);
gulp.task("default", ["phpunit", "watch"]);


elixir(function(mix) {
    mix.less('app.less');

    mix.task("karmaunit", ["public/js/**/spec.*",
			"gulpfile.js"]);

    mix.task("phpunit", ["tests/**/*",
			"app/**/*.php",
			"bootstrap/**/*.php",
			"resources/**/*"]);
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
	gulp.watch([
		"app/**/*.php",
		"tests/**/*",
		"resources/**/*",
		"bootstrap/**/*.php",
		"public/**/*.js",
		"public/**/*.html",
		"gulpfile.js"

	], ["phpunit", "karmaunit"]);
}

