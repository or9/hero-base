<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8"/>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
	<title>Hero Cards</title>

	<script src="{{ asset('/vendor/angularjs/angular.js') }}"></script>
	<script src="{{ asset('/vendor/angular-route/angular-route.min.js') }}"></script>

	<script src="{{ asset('/js/app.js') }}"></script>

	<script src="{{ asset('/js/components/flashCard.js') }}"></script>

	<script src="{{ asset('/js/components/scoreboardEntry.js') }}"></script>


	<script src="{{ asset('/js/components/cardChoices.js') }}"></script>
	<script src="{{ asset('/js/components/loader.js') }}"></script>

	<script src="{{ asset('/js/card/service.js') }}"></script>
	<script src="{{ asset('/js/card/ctrl.card.js') }}"></script>

	<script src="{{ asset('/js/game/service.js') }}"></script>
	<script src="{{ asset('/js/game/ctrl.game.js') }}"></script>

	<script src="{{ asset('/js/scoreboard/ctrl.scoreboard.js') }}"></script>
	<script src="{{ asset('/js/scoreboard/service.js') }}"></script>


	<link href='//fonts.googleapis.com/css?family=Roboto:400,300'/>

	<link href="{{ asset('/css/app.css') }}" rel="stylesheet"/>
	<!-- Fonts -->

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body ng-app="cardgameApp">
	@section("header")
	<h1>Hero Cards</h1>
	<nav class=""></nav>
	@show

	@yield("content")

	@yield("footer")

	<!-- Scripts -->
</body>
</html>
