(function (undefined) {
	"use strict";

	angular
		.module("scoreboardService", [])
		.factory("scoreboard", scoreboard);

	function scoreboard ($http) {

		function get () {
			$http.get("/api/scoreboard");
		}

		return {
			get: get
		};
	}
}());
