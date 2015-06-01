describe("CardCtrl", function () {
	"use strict";

	var	ctrl,
		scope,
		$httpBackend,
		$compile;

	var mockChar = {"id":0,"name":"ʾalif","translit":""};
	var mockForm = {};
	var cardElementHtml = "<ul ng-click='cards.select(0)' id='card0'>" +
		"<li>ʾalif<li>" +
		"<li>0</li>";

	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupController));
	afterEach(cleanupAfterEach);

	describe("#(init)", function () {
		it("Should initialize controller scope", function() {
			scope.cards.should.include.keys(
				"loading",
				"chars",
				"selected",
				"select"
			);
			$httpBackend.flush();
			scope.$digest();
		});


		it("Should immediately add card models to scope", function () {

			$httpBackend.flush();
			scope.$digest();
			scope.cards.chars.length.should.equal(1);

		});


	});

	describe("#select", function () {
		it("should provide a click handler", function () {
			scope.cards.select.should.be.a("function");
			$httpBackend.flush();

		});

		it("should set the selected element to selected property", function () {

			var element = $compile(cardElementHtml)(scope);
			element[0].click();
			scope.$digest();
			scope.cards.selected.should.equal(0);

			$httpBackend.flush();

		});

	});

	describe("#answer", function () {
		it("should make a request with the selected answer", function () {
			scope.cards.selected = 0;
			scope.$digest();
			$httpBackend.expectPOST("/api/answer/0").respond(200, { status: true });

			scope.cards.answer();

			$httpBackend.flush();
		});

		it("should handle success", function () {
			$httpBackend.flush();
		});

		it("should handle failure", function () {
			$httpBackend.flush();
		});

	});

	function setupThings () {
		module("cardgameApp", function ($provide) {
			//$provide.factory("cardService", ["$q", mockCardFactory]);
		});
	}

	function setupController (_$rootScope_, _$controller_, _$httpBackend_, _$compile_, cardService) {
		var url = {
			leng: "/api/characters/length",
			char: "/api/character/0",
			form: "/api/form/0",
			sendAnswer: "/api/answer"

		};
		scope = _$rootScope_.$new();

		$httpBackend = _$httpBackend_;
		$compile = _$compile_;
		// provide a status if passing number
		// otherwise number [1] is interpreted as status
		$httpBackend.whenGET(url.leng).respond(200, 1);
		$httpBackend.whenGET(url.char).respond( mockChar );
		$httpBackend.whenGET(url.form).respond( mockForm );
		$httpBackend.whenPOST(url.answer).respond( 200 );


		// use `Ctrl as ctrl` syntax to get scope.ctrl
		ctrl = _$controller_("CardCtrl as cards", {
			$scope: scope,
			cardService: cardService
		});

	}

	function cleanupAfterEach () {
		scope.$destroy();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}
});
