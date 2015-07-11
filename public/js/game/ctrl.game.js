(function (app, undefined) {
	app.controller("GameCtrl", GameController);

	function GameController ($scope) {
		var score;

		this.correct = 0;
		this.incorrect = 0;
		this.gameTime = 0;

		function adjustScore (adjustByNum) {
			score += adjustByNum;
		}

		function gameStart () {
			startTime = Date.now();
		}

		function gameEnd () {
			var milli, seconds, minutes, hours;
			milli = new Date(Date.now() - startTime);
			seconds = milli / 1000;
			minutes = seconds / 60;
			hours = minutes / 60;

		}
	}

})(angular.module("cardgameApp"));
