<?php namespace App\Http\Middleware;

use Closure;

class RequestErrorHandler {

	public function handle($request, Closure $next)
	{
		$response = $next($request);

		if($response instanceOf \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
			// return route("index");
			//return parent::handle($response, $next);
		}

		return $response;
	}
}
