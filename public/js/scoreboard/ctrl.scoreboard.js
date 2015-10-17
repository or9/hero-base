(function (app, undefined) {
	"use strict";

	app.controller("scoreboardCtrl", ScoreboardController);

	Object.defineProperties(ScoreboardController.prototype, {
		score: { value: 0, writable: true },
		username: { value: "", writable: true }
	});

	function ScoreboardController ($rootScope, $scope, scoreboardService) {


		this.score = $rootScope.score;
		delete $rootScope.score;

		function getLeaderboard () {

		}

		function getUserPositionOnLeaderboard () {

		}

		function updateLeaderboard () {

		}
	}


} (angular.module("cardgameApp")));
