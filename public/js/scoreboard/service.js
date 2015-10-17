(function (app, undefined) {
	"use strict";

	app.factory("scoreboardService", ScoreboardService);

	function ScoreboardService ($http) {

		return {
			get: get,
			save: save
		};

		function get (name) {
			name = name || "";

			return $http.get("/api/scoreboard/".concat(name));
		}

		function save (_name, _score) {
			return $http.post("/api/scoreboard", {name: _name, score: _score });
		}

		function errHandler () {
			console.log("ScoreboardService errHandler: ", arguments);
		}
	}

} (angular.module("cardgameApp")));
