(function (app, undefined) {

	app.directive("cardCurrent", Directive);

	function Directive () {
		return {
			scope: {
				cardInfo: "=info"
			},
			templateUrl: function (e, attr) {
				return "/js/components/cardCurrent.html";
			},
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
