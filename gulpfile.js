var gulp = require("gulp");
var elixir = require('laravel-elixir');
var util = require("gulp-util");
var spawn = require("child_process").spawn;
var karma = require("karma").server;
var jshint = require("gulp-jshint");

var files = getFiles();

gulp.task("jshint", task_jshint);
gulp.task("phpunit", task_phpunit);
gulp.task("karmaunit", ["jshint"], task_karmaunit);
gulp.task("watch", task_watch);

elixir(taskLess);

function taskLess (mix) {
	mix.less("*.less");
}

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
	var assetFiles = [
		"resources/assets/**/*"
	];

	return {
		php: phpFiles,
		javascript: javascriptFiles,
		jshint: jshintFiles,
		assets: assetFiles
	};
}

function task_phpunit () {
	spawn("vendor/bin/phpunit", [], { stdio: "inherit" });
	spawn("php", ["artisan", "migrate"], { stdio: "inherit" });

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
	gulp.watch(files.assets, [elixir.bind(null, taskLess)]);
}

