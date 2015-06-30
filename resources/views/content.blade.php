@extends('app')
@section('content')

<section id="content">

	<ng-view></ng-view>
	<div id="game" ng-controller="GameCtrl as game"></div>

</section>

@endsection
