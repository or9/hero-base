(function (app, undefined) {

	app.directive("cardChoices", Directive);

	function Directive () {
		return {
			scope: {
				cardInfo: "=info",
				length: "=length",
				select: "&onSelect"
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
