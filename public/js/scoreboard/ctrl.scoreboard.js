(function (app, undefined) {
	/* jshint validthis: true */
	"use strict";

	app.controller("scoreboardCtrl", ScoreboardController);

	Object.defineProperties(ScoreboardController.prototype, {

		user: { value: { name: "", score: 0 }, writable: true },

		entries: { value: [], writable: true }

	});

	function ScoreboardController ($rootScope, $scope, scoreboardService) {

		this.save = save.bind(this);

		$rootScope.score = +$rootScope.score || 0;

		this.user.score = Math.max(1, $rootScope.score);

		delete $rootScope.score;

		this.getUserPositionOnLeaderboard = getUserPositionOnLeaderboard.bind(this);


		scoreboardService.get()
			.then(getScoreboardSuccess.bind(this), scoreboardService.errHandler);



		function getScoreboardSuccess (response) {
			console.log("success. loaded scoreboard", response);
			this.entries = response.data;
		}

		function getUserPositionOnLeaderboard () {
			scoreboardService.get(this.user.name)
				.then(success.bind(this), scoreboardService.errHandler);

			function success (data) {
				console.log("user leaderboard data", data);
			}
		}

		function save () {
			scoreboardService.save(this.user.name, this.user.score)
				.then(success.bind(this), scoreboardService.errHandler);

				function success (data) {
					// do GET and update [[ entries ]]
					console.log("saved", data);
				}
		}
	}


} (angular.module("cardgameApp")));
