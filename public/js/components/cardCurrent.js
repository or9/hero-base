(function (app, undefined) {

	app.directive("cardCurrent", Directive);

	function Directive () {
		return {
			scope: {
				cardInfo: "=info"
			},
			templateUrl: function (e, attr) {
				//console.log("cardCurrent directive e? ", e, " attr? ", attr);
				return "/js/components/cardCurrent.html";
			},
			// controller
			// controllerAs
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
