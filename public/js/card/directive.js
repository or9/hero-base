(function (app, undefined) {

	app.directive("cardList", Directive);

	function Directive () {
		return {
			scope: true,
			templateUrl: "js/card/view.html",
			replace: true,
			controller: "CardCtrl",
			controllerAs: "cards"
		};
	}

})(angular.module("cardgameApp"));
