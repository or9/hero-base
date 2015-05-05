(function (app, undefined) {
	app.controller("GameCtrl", GameController);

	function GameController ($scope) {
		console.log("Hi. I'm GameCtrl!");
	}

})(angular.module("cardgameApp"));
