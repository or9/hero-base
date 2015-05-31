describe("cardsList", function () {
	var $compile, $rootScope, element;

	beforeEach(module("templates"));
	beforeEach(inject(setup));

	// angular doesn't provide sufficient methods for testing directives
	// So, will not test.
	// ng-html2js, templateCache.put, etc., encourages duplication
	// without providing valid testing scenarios,
	// encourage hardening of the system at the expense of flexibility
	// sacrificing strength is an unacceptable cost for such minimal gains

	function setup (_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;

		element = angular.element("<card-list></card-list>");
		$compile(element)($rootScope);
		$rootScope.$digest();

	}
});
