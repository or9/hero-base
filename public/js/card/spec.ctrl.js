/* jshint expr: true */
describe("CardCtrl", function () {
	"use strict";

	var	ctrl,
		scope,
		$httpBackend,
		$compile;

	var mockChar = {"id":0,"name":"ʾalif","translit":""};
	var mockForm = {};

	var cardElementHtml = "<ul ng-click='cards.select(0)' id='card0' class='card'>" +
		"<li>test1<li>" +
		"<li>0</li>";
	var cardElement2Html = "<ul ng-click='cards.select(1)' id='card1' class='card'>" +
		"<li>test2<li>" +
		"<li>1</li>";


	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupController));
	afterEach(cleanupAfterEach);

	describe("#[init]", function () {
		it("Should initialize controller scope", function() {
			scope.cards.should.include.keys(
				"loading",
				"chars",
				"selected",
				"select",
				"current",
				"availableChoices"
			);
			$httpBackend.flush();
			scope.$digest();
		});


		it("Should immediately add card models to scope", function () {

			$httpBackend.flush();
			scope.$digest();
			scope.cards.chars.length.should.equal(1);

		});

		it("Should call #next to set first current card", function () {

			$httpBackend.expectGET("/api/next").respond( 200, "2" );
			$httpBackend.flush();
			scope.$digest();

			scope.cards.current.should.equal("2");

		});

		it("Should randomly shuffle scope.availableChoices", function () {

			var i = 0;
			var comparison = [];

			scope.cards.ready = true;

			while (i < 32) {
				scope.cards.chars.push({ id: String(i) });
				comparison.push(i);
				i += 1;
			}

			$httpBackend.flush();
			scope.$digest();

			scope.cards.availableChoices.length.should.be.lessThan(9);
			scope.cards.availableChoices.should.not.deep.equal(comparison);


		});


	});

	describe("#select", function () {
		it("should provide a click handler", function () {
			scope.cards.select.should.be.a("function");
			$httpBackend.flush();

		});

		it("should set the selected element to selected property", function () {

			var element = $compile(cardElementHtml)(scope);
			document.body.appendChild(element[0]);
			element[0].click();
			scope.$digest();
			scope.cards.selected.should.equal(0);

			$httpBackend.flush();

		});

		it("should unselect a previous element", function () {

			var body = document.body;
			var element = $compile(cardElementHtml)(scope)[0];
			var element2 = $compile(cardElement2Html)(scope)[0];
			body.appendChild(element);
			body.appendChild(element2);
			element.click();
			element2.click();
			scope.cards.selected.should.equal(1);
			element2.classList.contains("selected").should.be.true;
			element.classList.contains("selected").should.be.false;

			$httpBackend.flush();
		});

	});

	describe("#answer", function () {
		it("should make a request with the selected answer", function () {
			scope.cards.selected = 0;
			$httpBackend.expectPOST("/api/answer/0").respond(200, "true" );
			scope.cards.answer();
			$httpBackend.flush();

		});

		it("should reset selected card upon true answer", function () {
			scope.cards.selected = 0;
			$httpBackend.expectPOST("/api/answer/0").respond( 200, "true" );
			scope.cards.loading.should.be.true;
			scope.cards.answer();
			$httpBackend.flush();

			scope.cards.loading.should.be.false;
			//scope.$digest();
			var selected = scope.cards.selected;
			expect(selected).to.be.null;

		});

		it("Should not reset selected upon false answer", function () {
			scope.cards.selected = 0;
			$httpBackend.expectPOST("/api/answer/0").respond( 200, "false" );

			scope.cards.answer();
			$httpBackend.flush();

			scope.cards.loading.should.be.false;
			scope.cards.selected.should.equal(0);
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
			next: "/api/next",
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
		$httpBackend.whenGET(url.next).respond( 200, "2" );

		$httpBackend.whenPOST(url.answer).respond( 200, "true" );


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
