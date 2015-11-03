(function (app, undefined) {

	app.directive("scoreboardEntry", Directive);

	function Directive () {
		return {
			scope: {
				entryId: "=entryId",
				user: "=user",
				ngModel: "=",
				readonlyValue: "@"
			},
			templateUrl: function (e, attr) {
				return "/js/components/scoreboardEntry.html";
			},
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
