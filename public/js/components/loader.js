(function (app, undefined) {

	app.directive("cgLoader", directive);

	function directive () {
		return {
			scope: true,
			templateUrl: function (e, attr) {
				return "/js/components/loader.html";
			},
			replace: true,
			restrict: "E"
		};
	}

})(angular.module("cardgameApp"));
