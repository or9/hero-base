describe("CardCtrl", function () {
	"use strict";

	var	ctrl,
		scope,
		$httpBackend;

	var mockChar = {"id":0,"name":"ʾalif","translit":""};
	var mockForm = {};

	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupController));
	afterEach(cleanupAfterEach);

	describe("#(init)", function () {
		it("Should initialize controller scope", function() {
			scope.cards.should.deep.equal({
				loading: true,
				chars: [],
				selected: null
			});

			$httpBackend.flush();
		});

		it("should have status `loading` upon initialization", function () {

			scope.cards.loading.should.be.true;
			$httpBackend.flush();
			scope.$digest();
			scope.cards.loading.should.be.false;

		});

		it("Should immediately add card models to scope", function () {

			$httpBackend.flush();
			scope.$digest();
			scope.cards.chars.length.should.equal(1);

		});


	});

	function setupThings () {
		module("cardgameApp", function ($provide) {
			//$provide.factory("cardService", ["$q", mockCardFactory]);
		});
	}

	function setupController (_$rootScope_, _$controller_, _$httpBackend_, cardService) {
		var url = {
			leng: "/api/characters/length",
			char: "/api/character/0",
			form: "/api/form/0"

		};
		scope = _$rootScope_.$new();

		$httpBackend = _$httpBackend_;
		// provide a status if passing number
		// otherwise number [1] is interpreted as status
		$httpBackend.whenGET(url.leng).respond(200, 1);
		$httpBackend.whenGET(url.char).respond( mockChar );
		$httpBackend.whenGET(url.form).respond( mockForm );


		// use `Ctrl as ctrl` syntax to get scope.ctrl
		ctrl = _$controller_("CardCtrl as cards", {
			$scope: scope,
			cardService: cardService
		});

		scope.$digest();

	}

	function cleanupAfterEach () {
		scope.$destroy();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}
});
