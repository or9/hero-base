@extends('app')
@section('content')

<section id="content" ng-controller="CardCtrl as cards">
	<h2>Start</h2>
	<p>[[ cards.loading ]]</p>
	[[ cards.chars ]]
</section>

@endsection
