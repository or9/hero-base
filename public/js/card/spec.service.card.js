describe("CardService", function () {

	var cardService;

	beforeEach(module("cardgameApp"));
	beforeEach(inject(function (_cardService_) {
		cardService = _cardService_;
	}));

	["getCard",
	"getCards",
	"getEachCard",
	"getLastIndex",
	"getForms"].forEach(function (method) {
			assertCardServiceReturnsPromise(method);
	});

	function assertCardServiceReturnsPromise (method) {
		it("should return a promise from method " + method, function() {
			var response = cardService[method]();
			response.should.have.property("success");
		});
	}
});
