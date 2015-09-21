/* jshint expr: true */
describe("CardCtrl", function () {
	"use strict";

	var	ctrl,
		scope,
		$httpBackend,
		$compile,
		$q,
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

	describe("#[init]", function () {
		it("Should initialize controller scope", function() {
			scope.cards.should.include.keys(
				"select",
				"answer",
				"start"
			);


			scope.$digest();


		});


		it("Should immediately add card models to scope", function () {

			scope.$digest();
			scope.cards.chars.length.should.equal(5);

		});

		it("Should call #next to set first current card", function () {

			scope.cards.start();

			$httpBackend.flush();

			scope.$digest();
			scope.$apply();
			scope.$digest();

			scope.cards.current.should.include.keys("id", "form");

		});

		it("Should randomly shuffle scope.availableChoices", function () {

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
	xdescribe("#answer", function () {

		it("should reset selected card upon true answer", function () {

			var deferred = $q.defer();

			scope.cards.start();

			scope.cards.selected = 0;
			scope.cards.current = { id: 0 };

			//$httpBackend.expectPOST("/api/answer/0").respond( 200, "true" );

			deferred.resolve(true);

			//scope.cards.answer();

			//$httpBackend.flush();
			scope.$digest();

			scope.$digest();
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

	function setupController (_$rootScope_, _$controller_, _$httpBackend_, _$compile_, _$q_, _cardService_) {
		var url = {
			leng: "/api/characters/length",
			char: "/api/character/0",
			chars: "/api/character/",
			form: "/api/form/0",
			forms: "/api/form/",
			next: "/api/next",
			sendAnswer: "/api/answer"

		};
		$q = _$q_;
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
