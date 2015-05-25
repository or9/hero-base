describe("CardCtrl", function () {
	"use strict";

	var	ctrl,
		scope,
		$httpBackend;

	var mockCardService = {};
	var mockChar = {"id":0,"name":"ʾalif","translit":""};
	var mockForm = {};

	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupController));
	afterEach(cleanupAfterEach);

	describe("#(init)", function () {
		it("should have status `loading` upon initialization", function () {

			scope.loading.should.be.true;
			$httpBackend.flush();
			scope.$digest();
			scope.loading.should.be.false;

		});

		it("Should immediately add card models to scope", function () {

			$httpBackend.flush();
			scope.$digest();
			scope.chars.length.should.equal(1);

		});

	});

	function setupThings () {
		module("cardgameApp", function ($provide) {
			//$provide.factory("cardService", ["$q", mockCardFactory]);
		});

		//inject(setupService);
	}

	function setupModule ($provide) {
		console.log("ferfucksakes");
		//$provide.value("cardService", mockCardService);
		$provide.factory("cardService", ["$q", mockCardFactory]);
	}

	function setupService ($q) {
		mockCardService = {
			getLastIndex: function getLength () {
				var defer = $q.defer();
				var len = Object.keys(mockChar).length;
				defer.resolve(len);
				return defer.promise;
			},
			getForm: function getForm () {
				var defer = $q.defer();
				defer.resolve(mockForm);
				return defer.promise;
			},
			getCard: function getChar () {
				var defer = $q.defer();
				defer.resolve(mockChar);
				return defer.promise;
			},
			error: function errHandler () {
				var defer = $q.defer();
				defer.reject("Not tonight! QQ");
				return defer.promise;
			}

		};
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


		ctrl = _$controller_("CardCtrl", {
			$scope: scope,
			cardService: cardService
		});

		scope.$digest();

	}

	function mockCardFactory ($q) {
		return {
			getLastIndex: function getLength () {
				var defer = $q.defer();
				var len = Object.keys(mockChar).length;
				defer.resolve(len);
				return defer.promise;
			},
			getForm: function getForm () {
				var defer = $q.defer();
				defer.resolve(mockForm);
				return defer.promise;
			},
			getCard: function getChar () {
				var defer = $q.defer();
				defer.resolve(mockChar);
				return defer.promise;
			},
			error: function errHandler () {
				var defer = $q.defer();
				defer.reject("Not tonight! QQ");
				return defer.promise;
			}

		};
	}

	function cleanupAfterEach () {
		scope.$destroy();
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	}
});
