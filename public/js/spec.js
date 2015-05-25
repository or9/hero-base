describe("App", function () {
	"use strict";

	beforeEach(module("cardgameApp", moduleSetup),
			inject(injectSetup));

	function moduleSetup (_$provide_) {
		console.log("App's module setup");
	}

	function injectSetup (_$location_, _$routeProvider_) {
		console.log("App's inject setup");
	}
});
