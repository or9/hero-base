var elixir = require('laravel-elixir');
var util = require("gulp-util");
var exec = require("child_process").exec;
var sys = require("sys");
var karma = require("karma").server;

gulp.task("phpunit", phpunit);
gulp.task("karmaunit", karmaunit);
gulp.task("watch", watch);
gulp.task("default", ["phpunit", "watch"]);


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less('app.less');
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
		"resources/**/*.php",
		"bootstrap/**/*.php",
		"public/**/*",
		"gulpfile.js"

	], ["phpunit", "karmaunit"]);
}

