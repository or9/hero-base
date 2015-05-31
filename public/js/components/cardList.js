(function (app, undefined) {

	app.directive("cardList", Directive);

	function Directive () {
		console.log("directiving");
		return {
			scope: true,
			templateUrl: function (e, attr) {
				return "/js/components/cardList.html";
			},
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
