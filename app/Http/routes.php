<?php

Route::get("/", "WelcomeController@index");

Route::get("home", "HomeController@index");

Route::get("characters", "GameController@characters");

Route::get("forms", "GameController@forms");

Route::get("scoreboard", "GameController@scoreboard");

Route::controllers([
	"auth" => "Auth\AuthController",
	"password" => "Auth\PasswordController",
]);
