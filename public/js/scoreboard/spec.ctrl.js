/* jshint expr: true */
describe("Scoreboard Controller", function () {
	"use strict";

	var	ctrl,
		scope,
		$rootScope,
		$httpBackend,
		$location,
		$controller,
		scoreboardService,
		sandbox;

	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupController));
	beforeEach(createSinonSandbox);
	afterEach(restoreSinon);
	afterEach(cleanupAfterEach);

	describe("#init", function () {
		it("should have expected properties on scoreboard controller", function () {

			$rootScope.score = 0;
			ctrl = getScoreboardController();

			ctrl.should.include.keys("save", "getUserPositionOnLeaderboard");

		});

		it("should set its score value to $rootScope.score", function () {

			$rootScope.score = 9001;
			ctrl = getScoreboardController();
			ctrl.user.score.should.equal(9001);
		});

		it("should delete $rootScope.score", function () {

			$rootScope.score = 1;
			ctrl = getScoreboardController();
			should.not.exist($rootScope.score);
		});

		it("should set score to 1 if score is less than 1", function () {
			$rootScope.score = -1234567890;
			ctrl = getScoreboardController();
			ctrl.user.score.should.equal(1);
		});

		it("should call scoreboardService.get with no arguments", function () {
			sandbox.spy(scoreboardService, "get");
			ctrl = getScoreboardController();
			scoreboardService.get.calledWith(undefined).should.be.true;
		});
	});

	describe("#save", function () {
		it("should call scoreboardService.save with scope's username and score", function () {

			ctrl.user.score = 31;
			ctrl.user.name = "hi!";

			sandbox.spy(scoreboardService, "save");

			ctrl.save();

			scoreboardService.save.calledWith("hi!", 31).should.be.true;
		});
	});

	describe("#getUserPositionOnLeaderboard", function () {
		it("should call scoreboardService.get with username", function () {

			ctrl.user.name = "aaa";
			sandbox.spy(scoreboardService, "get");
			ctrl.getUserPositionOnLeaderboard();
			scoreboardService.get.calledWith("aaa").should.be.true;

		});

	});

	function cleanupAfterEach () {
		$rootScope.$destroy();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}

	function createSinonSandbox () {
		sandbox = sinon.sandbox.create();
	}

	function restoreSinon () {
		sandbox.restore();
	}

	function setupController (_$rootScope_, _$controller_, _$httpBackend_, _$location_, _scoreboardService_) {

		$controller = _$controller_;
		$location = _$location_;
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		scope = $rootScope.$new();
		scoreboardService = _scoreboardService_;

		ctrl = getScoreboardController();
	}

	function getScoreboardController () {
		return $controller("scoreboardCtrl as scoreboard", {
			$scope: scope,
			$rootScope: $rootScope,
			scoreboardService: scoreboardService
		});
	}
});
