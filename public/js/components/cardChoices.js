(function (app, undefined) {

	app.directive("cardChoices", Directive);

	function Directive () {
		return {
			scope: {
				cardInfo: "=info",
				answerChoice: "@",
				select: "&select",
				answer: "&answer"
			},
			templateUrl: function (e, attr) {
				//console.log("cardCurrent directive e? ", e, " attr? ", attr);
				return "/js/components/cardChoices.html";
			},
			// controller:
			// controllerAs
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
