(function (app, undefined) {

	app.directive("cardList", Directive);

	function Directive () {
		return {
			scope: true,
			templateUrl: "card.html",
			replace: true,
			controller: "CardCtrl",
			controllerAs: "cards"
		};
	}

})(angular.module("cardgameApp"));
