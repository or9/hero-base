(function (undefined) {
	angular
		.module("formsService", [])
		.factory("forms", forms);

	function forms ($http) {

		function get () {
			$http.get("/api/forms");
		}

		return {
			get: get
		};
	}
}());
