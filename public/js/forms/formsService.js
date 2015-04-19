(function ($module, undefined) {
	"use strict";

	$module("formsService", [])
		.factory("forms", forms);

	function forms ($http) {

		function get () {
			$http.get("/api/forms");
		}

		function errorHandler (err) {
			console.log("forms service got err: ", err);
		}

		return {
			get: get,
			errorHandler: errorHandler
		};
	}

} (angular.module));
