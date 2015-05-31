(function (app, undefined) {
	"use strict";

	app.factory("Scoreboard", Scoreboard);

	function Scoreboard ($http) {

		function get () {
			$http.get("/api/scoreboard");
		}

		function errorHandler (err) {
			console.log("scoreboardService got err: ", err);
		}

		return {
			get: get,
			errorHandler: errorHandler
		};
	}

} (angular.module("cardgameApp")));
