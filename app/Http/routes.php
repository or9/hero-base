<?php

Route::get("/", [
	"as"	=> "index",
	"uses"	=> "PageviewController@index"
]);

// API
Route::group(["prefix" => "api"], function() {
	Route::get("characters", "GameController@characters");
	Route::get("forms", "GameController@forms");
	Route::get("scoreboard", "GameController@scoreboard");
});
