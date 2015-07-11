(function (app, undefined) {

	app.directive("flashCard", Directive);

	function Directive () {
		return {
			scope: {
				info: "=info",
				name: "=name",
				form: "=form",
				length: "=length",
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
