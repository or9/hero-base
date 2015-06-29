(function (app, undefined) {

	app.directive("cardList", Directive);

	function Directive () {
		return {
			scope: true,
			templateUrl: function (e, attr) {
				//console.log("cardList directive e? ", e, " attr? ", attr);
				return "/js/components/cardList.html";
			},
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
