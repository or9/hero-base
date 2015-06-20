<?php namespace App\Services;

class GameService {

	private $remaining = [];
	private $currentAnswerIndex = "0";

	/**
 	 * Add ID of item to this->remaining array
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
			$items = array_column($items, null, "id");

			$this->remaining = array_replace($this->remaining, $items);

		}
	}

	/**
 	 * Verify answer
	 * @param {string} answerIndex
	 * return {boolean}
	 */
	public function answer ($answerIndex)
	{
		$isCorrect = false;

		if (strval($answerIndex) === $this->currentAnswerIndex) {
			$isCorrect = true;
		}

		return $isCorrect;
	}

	/**
	 * Next card from remaining
	 * @return {integer} index
	 */
	public function next ()
	{
		$this->currentAnswerIndex = (string) array_rand($this->remaining);
		return $this->currentAnswerIndex;
	}

	/**
	 * @return {interger} count remaining questions
	 */
	public function countRemaining ()
	{
		return count($this->remaining);
	}

}
