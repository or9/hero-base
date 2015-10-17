(function (app, undefined) {
	/* jshint validthis: true */
	"use strict";

	app.controller("scoreboardCtrl", ScoreboardController);

	Object.defineProperties(ScoreboardController.prototype, {
		score: { value: 0, writable: true },
		username: { value: "", writable: true },
		entries: { value: [], writable: true }
	});

	function ScoreboardController ($rootScope, $scope, scoreboardService) {

		this.save = save.bind(this);
		this.getUserPositionOnLeaderboard = getUserPositionOnLeaderboard.bind(this);
		this.score = Math.max(1, $rootScope.score);

		delete $rootScope.score;

		scoreboardService.get()
			.then(getScoreboardInitialSuccess, scoreboardService.errHandler);

		function getScoreboardInitialSuccess (data) {
			console.log("success. loaded scoreboard", data);
		}

		function getUserPositionOnLeaderboard () {
			scoreboardService.get(this.username)
				.then(success.bind(this), scoreboardService.errHandler);

			function success (data) {
				console.log("user leaderboard data", data);
			}
		}

		function save () {
			scoreboardService.save(this.username, this.score)
				.then(success.bind(this), scoreboardService.errHandler);

				function success (data) {
					console.log("saved", data);
				}
		}
	}


} (angular.module("cardgameApp")));
