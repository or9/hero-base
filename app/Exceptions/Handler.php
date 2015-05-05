<?php namespace App\Exceptions;

use Route;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler {

	/**
	 * A list of the exception types that should not be reported.
	 *
	 * @var array
	 */
	protected $dontReport = [
		'Symfony\Component\HttpKernel\Exception\HttpException'
	];

	/**
	 * Report or log an exception.
	 *
	 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
	 *
	 * @param  \Exception  $e
	 * @return void
	 */
	public function report(Exception $e)
	{

		return parent::report($e);

	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Exception  $e
	 * @return \Illuminate\Http\Response
	 */
	public function render($request, Exception $e)
	{
		$pageNotFound = $this->isHttpException($e) && $e->getStatusCode() === 404;

		if ($e instanceof ModelNotFoundException) {
			// model not found exception
			var_dump("model not found exception: " . $e);
		}

		if ($pageNotFound) {
			// echo route("index");
			return redirect()->route("index");

		}

		return parent::render($request, $e);
	}

}
