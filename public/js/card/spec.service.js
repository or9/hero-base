/* jshint expr: true */
describe("CardService", function () {

	var cardService, $httpBackend;

	beforeEach(module("cardgameApp"));
	beforeEach(inject(setupInject));

	["getCard",
	"getForm",
	"requestCard",
	"requestForm",
	"error"].forEach(function (method) {
		it("should reveal a method " + method, function() {
			cardService[method].should.not.be.null;
		});
	});


	it("should indicate an initial status of loading", function () {
		cardService.loading.should.be.true;
	});

	it("should have an array of cards", function () {
		cardService.cards.length.should.be.a("number");
	});

	it("should have an array of forms", function () {
		cardService.forms.length.should.be.a("number");
	});

	it("should return its length", function () {
		cardService.lastIndex.should.be.a("number");
	});

	function setupInject (_cardService_, _$httpBackend_) {
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
	}
});
