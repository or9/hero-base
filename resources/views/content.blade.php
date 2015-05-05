@extends('app')
@section('content')

<section id="content">

	<!--ng-view></ng-view-->
	<card-list></card-list>
	<div id="game" ng-controller="GameCtrl as game"></div>

</section>

@endsection
