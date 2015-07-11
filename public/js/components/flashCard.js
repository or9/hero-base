(function (app, undefined) {

	app.directive("flashCard", Directive);

	function Directive () {
		return {
			scope: {
				cardInfo: "=",
				cardName: "=",
				cardForm: "=",
				length: "=",
				className: "@"
			},
			templateUrl: function (e, attr) {
				return "/js/components/flashCard.html";
			},
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
