(function (undefined) {
	angular
		.module("charactersFactory", [])
		.factory("characters", characters);

	function characters($http) {

		function get () {
			return $http.get("/api/characters");
		}

		return {
			get: get
		};
	}

}());
