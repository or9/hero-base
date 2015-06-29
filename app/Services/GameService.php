<?php namespace App\Services;

class GameService {

	const CACHE_NAME = "GAME_SERVICE_";
	const REMAINING = self::CACHE_NAME . "REMAINING";
	const CURRENT_ANSWER_INDEX = self::CACHE_NAME . "CURRENT_ANSWER_INDEX";

	private static $remaining = [];
	private static $current_answer_index = "0";

	public function __construct () {
		self::$remaining = apc_fetch(self::REMAINING);
		self::$current_answer_index = apc_fetch(self::CURRENT_ANSWER_INDEX);
	}

	/**
 	 * Add ID of item to this->remaining array
	 * @param char | chars
	 * @return void
	 */
	public function add ($item)
	{
		if (count($item) === 1) {

			$index = $item["original"]["id"];
			self::$remaining[$index] = $item;

		} else {
			// add elements at correct index

			$items = array_column($item, "original");
			$items = array_column($items, null, "id");

			self::$remaining = array_replace(self::$remaining, $items);

		}

		apc_store(self::REMAINING, self::$remaining);
	}

	/**
 	 * Verify answer
	 * @param {string} answerIndex
	 * return {boolean}
	 */
	public function answer ($answerIndex = null)
	{
		self::$current_answer_index = apc_fetch(self::CURRENT_ANSWER_INDEX);

		$isCorrect = "false";

		if (strval($answerIndex) === self::$current_answer_index) {
			$isCorrect = "true";
		}

		return $isCorrect;
	}

	/**
	 * Next card from remaining
	 * @return {integer} index
	 */
	public function next ()
	{
		self::$current_answer_index = (string) array_rand(self::$remaining)["id"];

		//return print_r(array_rand(self::$remaining));

		apc_store(self::CURRENT_ANSWER_INDEX, self::$current_answer_index);

		return self::$current_answer_index;
	}

	/**
	 * @return {interger} count remaining questions
	 */
	public function countRemaining ()
	{
		return count(self::$remaining);
	}

	public function reset ()
	{
		self::$remaining = [];
		self::$current_answer_index = "0";

		apc_delete(self::REMAINING);
		apc_delete(self::CURRENT_ANSWER_INDEX);
	}

}
