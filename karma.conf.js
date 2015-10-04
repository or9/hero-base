var excludeCoverage = [
	"public/vendor/**/*.js",
	"public/**/spec.*.js"
];

var coverageConfig = {
	global: {
		excludes: excludeCoverage
	}
};

module.exports = function karma (config) {

	config.set({
		basePath: '',

		plugins: [
			"karma-mocha",
			"karma-mocha-reporter",
			"karma-sinon-chai",
			"karma-phantomjs2-launcher"
		],

		mochaReporter: {
			output: "autowatch"
		},

		frameworks: ["mocha", "sinon-chai"],

		files: [
			'public/vendor/angularjs/angular.js',
			'public/vendor/angular-route/angular-route.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'public/js/lib/util.js',
			'public/js/**/*.html',
			'public/js/**/*.js',
			'public/js/**/spec.*.js'
		],

		exclude: ["**/*.swp", "**/*.swo"],

		preprocessors: {
			"public/**/*.js": ["coverage"]
		},

		reporters: [
			"mocha",
			"coverage"
		],

		coverageReporter: {
			type: "text-summary",
			check: coverageConfig
		},

		port: 9876,

		colors: true,

		// config.[LOG_DISABLE|LOG_ERROR|LOG_WARN|LOG_INFO|LOG_DEBUG]
		logLevel: config.LOG_ERROR,

		autoWatch: true,

		browsers: ['PhantomJS2'],

		singleRun: false

	});

};

