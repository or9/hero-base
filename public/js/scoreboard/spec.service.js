/* jshint expr: true */
describe("Scoreboard Service", function () {
	"use strict";

	var scoreboardService,
		$httpBackend,
		$http,
		sandbox;

	beforeEach(module("cardgameApp"));

	beforeEach(inject(setupInject));

	beforeEach(function () {
		sandbox = sinon.sandbox.create();
	});

	afterEach(function () {
		sandbox.restore();
	});

	it("should have expected methods", function () {
		var expectedProperties = [
			"get",
			"save"
		];

		expectedProperties.forEach(function (property) {
			scoreboardService.should.include.keys(property);
		});

	});

	it("should return a promise from 'get'", function () {
		var thing = scoreboardService.get();
		thing.then.should.be.a("function");
	});

	it("should return a promise from 'post'", function () {
		var thing = scoreboardService.save();
		thing.then.should.be.a("function");

	});

	it("should make a request to /api/scoreboard/ if no name provided", function () {
		sandbox.stub($http, "get", function () {});
		scoreboardService.get();
		$http.get.calledWith("/api/scoreboard/").should.be.true;
	});

	it("should make a request via 'get' to /api/scoreboard/{name} if provided a name", function () {
		sandbox.stub($http, "get", function () {});
		scoreboardService.get("sometestusername");
		$http.get.calledWith("/api/scoreboard/sometestusername").should.be.true;

	});

	it("should post a name and score to /api/scoreboard", function () {
		sandbox.stub($http, "post", function () {});
		scoreboardService.save("asdf", 1234);
		$http.post.calledWith("/api/scoreboard", { name: "asdf", score: 1234 }).should.be.true;
	});

	function setupInject (_scoreboardService_, _$httpBackend_, _$http_) {
		scoreboardService = _scoreboardService_;
		$httpBackend = _$httpBackend_;
		$http = _$http_;

		$httpBackend.whenGET("/api/scoreboard")
			.respond(200, [{
				rank: 0,
				name: "jkl",
				score: 9001
			}, {
				rank: 1,
				name: "jim",
				score: 0
			}]);

		$httpBackend.whenPOST("/api/scoreboard")
			.respond({ created: true });
	}
});
