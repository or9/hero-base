@extends('app')
@section('content')

<section id="content" ng-controller="CardCtrl as cards">
	<h2>Start</h2>
	<p>loading: [[ cards.loading ]]</p>

	<ul class="card" id="card[[ char.id ]]" ng-repeat="char in cards.chars">
		<li>[[ char.name ]]</li>
		<li>[[ char.id ]]</li>
	</ul>

</section>

@endsection
