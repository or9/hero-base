<?php namespace App\Services;

class GameService {

	private $remaining = [];

	public function add ($item = null)
	{
		array_push($this->remaining, $item);
	}

	public function countRemaining ()
	{
		return count($this->remaining);
	}
}
