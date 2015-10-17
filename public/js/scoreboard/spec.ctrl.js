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
	afterEach(cleanupAfterEach);

	describe("#init", function () {
		it("should have expected properties on scoreboard controller", function () {

			$rootScope.score = 0;
			ctrl = getScoreboardController();

			ctrl.should.include.keys("score");

		});

		it("should set its score value to $rootScope.score", function () {

			$rootScope.score = 9001;
			ctrl = getScoreboardController();
			ctrl.score.should.equal(9001);
		});

		it("should delete $rootScope.score", function () {

			$rootScope.score = 1;
			ctrl = getScoreboardController();
			should.not.exist($rootScope.score);
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
