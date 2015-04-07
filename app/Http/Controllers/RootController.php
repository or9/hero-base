<?php namespace App\Http\Controllers;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use DB;

class RootController extends Controller {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//$data = DB::select("SELECT * FROM characters");
		//$out = new \Symfony\Component\Console\Output\ConsoleOutput();


		//$out->writeln(serialize($data));
		//return view("start")->with( "data", $data );
		return view("start");
	}

}
