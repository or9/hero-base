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
			restrict: "E",
			compile: function compileDirective (element, attr) {
				console.log("element? ", element, "\nattr? ", attr);
				if (element.readonly) {
					console.log("yes");
				}
			}
		};
	}

})(angular.module("cardgameApp"));
