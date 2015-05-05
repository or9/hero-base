describe("CardCtrl", function () {
	var scope, ctrl, $httpBackend;
	var mockData = {"id":6,"name":"\u1e2b\u0101\u02be","translit":"","created_at":"2015-04-05 17:25:44","updated_at":"2015-04-05 17:25:44"};

	beforeEach(module("cardgameApp"));

	beforeEach(inject(beforeEachSetup));

	describe("#init IFFE", function () {
		it("Should immediately add card models to scope", function () {
			scope = {};
			ctrl = $controller("CardCtrl", { $scope: scope });

			expect(scope.cards.length).not.toBe(0);
		});

		it("Should add response of API call to scope", function () {
			scope.cards.should.be(undefined);
			$httpBackend.flush();

			scope.cards.should.equal(mockData);
		});

	});


	function beforeEachSetup (_$httpBackend_, $rootScope, $controller) {
		$httpBackend = _$httpBackend_;

		$httpBackend.expectGet("/api/cards")
			.respond(mockData);

		scope = $rootScope.$new();

		ctrl = $controller("CardCtrl", { $scope: scope });

	}
});
