<?php namespace App\Http\Controllers;

// use App\Http\Requests;
use App\Http\Controllers\Controller;
use Route;

// use Illuminate\Http\Request;
// use DB;

class PageviewController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		// currentRouteName is index1
		return view("content");
	}

}
