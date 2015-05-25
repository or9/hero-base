describe("CardService", function () {

	var cardService, $httpBackend;

	beforeEach(module("cardgameApp"));

	beforeEach(inject(function (_cardService_, _$httpBackend_) {
		cardService = _cardService_;
		$httpBackend = _$httpBackend_;

		$httpBackend.whenGET("/api/characters/length")
			.respond(200, 1);

		$httpBackend.whenGET("/api/character/0")
			.respond({
				id: 0,
				name: "testthing",
				translit: "hi"
			});

		$httpBackend.whenGET("/api/form/0")
			.respond({
				id: 0,
				name: "testthingInitialForm",
				translit: "hi"
			});
	}));

	["getCard",
	"getLastIndex",
	"getForm"].forEach(function (method) {
			assertCardServiceReturnsPromise(method);
	});

	function assertCardServiceReturnsPromise (method) {
		it("should return a promise from method " + method, function() {
			var response = cardService[method]();
			response.should.have.property("success");
		});
	}
});
