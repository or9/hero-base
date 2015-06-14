<?php namespace App\Services;

class GameService {

	private $remaining = [];

	/**
	 * @param char | chars
	 * @return void
	 */
	public function add ($item)
	{
		if (count($item) === 1) {
			$index = $item["original"]["id"];
			$this->remaining[$index] = $item;
		} else {
			// add elements at correct index
			$items = array_column($item, "original");
			$this->remaining = array_column($items, null, "id");
		}
	}

	public function countRemaining ()
	{
		return count($this->remaining);
	}

	private function fillRemaining ($items)
	{
		//$this->remaining = array_column($items)
		//$this->remaining[] = $items;
	}
}
