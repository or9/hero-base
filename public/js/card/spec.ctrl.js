/* jshint expr: true */
describe("Card Controller", function () {
	"use strict";

	var	ctrl,
		scope,
		$rootScope,
		$httpBackend,
		$compile,
		$q,
		$location,
		cardService,
		sandbox;

	var mockChar = getMockChar(0);
	var mockChars = [getMockChar(0), getMockChar(1), getMockChar(2), getMockChar(3), getMockChar(4)];
	var mockForm = getMockForm(0);
	var mockForms = [getMockForm(0), getMockForm(1), getMockForm(2), getMockForm(3), getMockForm(4)];
	var cardElementHtml = "<ul ng-click='cards.select(0)' id='card0' class='card'>" +
		"<li>test1<li>" +
		"<li>0</li>";
	var cardElement2Html = "<ul ng-click='cards.select(1)' id='card1' class='card'>" +
		"<li>test2<li>" +
		"<li>1</li>";



	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupController));
	afterEach(cleanupAfterEach);

	function createSinonSandbox () {
		sandbox = sinon.sandbox.create();
	}

	function restoreSinon () {
		sandbox.restore();
	}

	describe("#[init]", function () {
		beforeEach(createSinonSandbox);
		afterEach(restoreSinon);

		it("should check the current time", function () {
			sandbox.spy(Date, "now");
			scope.cards.start();
			$httpBackend.flush();
			Date.now.calledOnce.should.be.true;
		});

		it("should initialize controller scope", function() {
			scope.cards.should.include.keys(
				"select",
				"answer",
				"start"
			);


			scope.$digest();


		});


		it("should immediately add card models to scope", function () {

			scope.$digest();
			scope.cards.chars.length.should.equal(5);

		});

		it("should call #next to set first current card", function () {

			scope.cards.start();

			$httpBackend.flush();

			scope.$digest();
			scope.$apply();
			scope.$digest();

			scope.cards.current.should.include.keys("id", "form");

		});

		it("should randomly shuffle scope.availableChoices", function () {

			var i = 0;
			var comparison = [];

			while (i < 32) {
				scope.cards.chars.push({ id: String(i) });
				comparison.push(i);
				i += 1;
			}

			scope.$digest();

			scope.cards.availableChoices.length.should.be.lessThan(9);
			scope.cards.availableChoices.should.not.deep.equal(comparison);


		});


	});

	describe("#select", function () {
		it("should provide a click handler", function () {
			scope.cards.select.should.be.a("function");

		});

		it("should set the selected element to selected property", function () {

			var element = $compile(cardElementHtml)(scope);
			document.body.appendChild(element[0]);
			element[0].click();
			scope.$digest();
			scope.cards.selected.should.equal(0);

		});

	});

	// too easy to break karma / angularjs tests. Don't test.
	describe("#answer", function () {
		beforeEach(createSinonSandbox);
		afterEach(restoreSinon);

		it("should remove correct answer from remaining", function () {

			var selected;

			scope.cards.start();

			scope.cards.selected = 0;
			scope.cards.current = { id: 0 };
			scope.cards.remaining[0].id.should.equal(0);

			$httpBackend.expectPOST("/api/answer/0").respond( 200, "true" );

			scope.cards.answer();

			$httpBackend.flush();

			scope.$digest();

			selected = scope.cards.selected;

			expect(selected).not.to.exist;

			scope.cards.remaining[0].id.should.not.equal(0);

		});

		it("should not remove incorrect answer from remaining", function () {
			scope.cards.selected = 2;
			scope.cards.current = { id: 0 };
			$httpBackend.expectPOST("/api/answer/2").respond( 200, "false" );

			scope.cards.answer();
			$httpBackend.flush();

			scope.$digest();

			scope.cards.selected.should.equal(2);
			scope.cards.remaining[0].id.should.equal(0);
		});

		it("should add class 'incorrect' to body upon incorrect answer", function () {
			scope.cards.selected = 2;
			scope.cards.current = { id: 0 };
			$httpBackend.expectPOST("/api/answer/2").respond( 200, "false" );

			scope.cards.answer();
			$httpBackend.flush();
			scope.$digest();

			document.body.classList.contains("incorrect").should.be.true;

		});

		it("should remove class 'incorrect' from body upon correct answer", function () {

			scope.cards.start();
			document.body.classList.add("incorrect");

			scope.cards.selected = 0;
			scope.cards.current = { id: 0 };

			$httpBackend.expectPOST("/api/answer/0").respond( 200, "true" );
			scope.cards.answer();
			$httpBackend.flush();
			scope.$digest();

			document.body.classList.contains("incorrect").should.be.false;
		});

		it("should request the time", function () {
			sandbox.spy(Date, "now");
			scope.cards.answer();
			$httpBackend.flush();
			Date.now.calledOnce.should.be.true;
		});

		it("should change $location.url to scoreboard if no cards remaining", function () {

			$httpBackend.expectPOST("/api/answer/0").respond( 200, "true" );

			scope.cards.remaining = [];
			scope.cards.start();
			scope.cards.selected = 0;
			scope.cards.remaining = [{ id: 0 }];
			scope.cards.current = { id: 0 };

			scope.cards.answer();

			$httpBackend.flush();

			$location.url().should.contain("/scoreboard");
		});

		it("should increase the score upon correct answer", function () {

			var oldScore = $rootScope.score = 0;
			scope.cards.start();

			scope.cards.selected = 0;
			scope.cards.current = { id: 0 };

			$httpBackend.expectPOST("/api/answer/0").respond( 200, "true" );
			scope.cards.answer();
			$httpBackend.flush();
			// scope.$digest();
			$rootScope.score.should.be.greaterThan(oldScore);
		});

		it("should decrease the score by 1 upon incorrect answer", function () {

			$rootScope.score = 1;
			scope.cards.start();

			scope.cards.selected = 0;
			scope.cards.current = { id: 1 };

			$httpBackend.expectPOST("/api/answer/0").respond( 200, "false" );
			scope.cards.answer();
			$httpBackend.flush();

			$rootScope.score.should.equal(0);
		});

	});

	function getMockChar (index) {

		return {
			id: index,
			name: "test" + index,
			translit: "",
			updated_at: Date.now(),
			created_at: Date.now()
		};
	}

	function getMockForm (index) {
		var char = getMockChar(index);
		char.form = {
			fk_id_characters: index,
			isolated: "test_isolated_" + index,
			medial: "test_medial_" + index,
			final: "test_final_" + index,
			initial: "test_initial_" + index
		};

		return char;
	}

	function setupThings () {
		module("cardgameApp", function ($provide) {
			//$provide.factory("cardService", ["$q", mockCardFactory]);
		});
	}

	function setupController (_$rootScope_, _$controller_, _$httpBackend_, _$compile_, _$q_, _$location_, _cardService_) {
		var url = {
			leng: "/api/characters/length",
			char: "/api/character/0",
			chars: "/api/character/",
			form: "/api/form/0",
			forms: "/api/form/",
			next: "/api/next",
			sendAnswer: "/api/answer"

		};
		$rootScope = _$rootScope_;
		$q = _$q_;
		$location = _$location_;
		cardService = _cardService_;
		scope = _$rootScope_.$new();

		$httpBackend = _$httpBackend_;
		$compile = _$compile_;
		// provide a status if passing number
		// otherwise number [1] is interpreted as status
		$httpBackend.whenGET(url.leng).respond(200, 1);
		$httpBackend.whenGET(url.char).respond(mockChar);
		$httpBackend.whenGET(url.chars).respond(mockChars);
		$httpBackend.whenGET(url.forms).respond(logMockForms());

		$httpBackend.whenGET(url.form).respond( 200, mockForms[2] );
		$httpBackend.whenGET(url.next).respond( 200, "2" );

		$httpBackend.whenPOST(url.answer).respond( 200, "true" );

		$httpBackend.expectGET("/api/character/");
		$httpBackend.expectGET("/api/form/");

		// use `Ctrl as ctrl` syntax to get scope.ctrl
		ctrl = _$controller_("CardCtrl as cards", {
			$scope: scope,
			$rootScope: $rootScope,
			cardService: cardService
		});

		function logMockForms () {

			return mockForms;

		}


		$httpBackend.flush();
	}


	function cleanupAfterEach () {
		scope.$destroy();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}
});
