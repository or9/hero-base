<?php namespace App\Services;

class GameService {

	const CACHE_NAME = "GAME_SERVICE_";
	const REMAINING = self::CACHE_NAME . "REMAINING";
	const CURRENT_ANSWER_INDEX = self::CACHE_NAME . "CURRENT_ANSWER_INDEX";

	private static $remaining;
	private static $current_answer_index = "0";

	public function __construct () {
		self::$remaining = apc_fetch(self::REMAINING);
		self::$current_answer_index = apc_fetch(self::CURRENT_ANSWER_INDEX);

		if (!self::$remaining) {
			self::$remaining = [];
		}
	}

	/**
 	 * Add ID of item to this->remaining array
	 * @param char | chars
	 * @return void
	 */
	public function add ($data)
	{

		$data = json_decode($data->getContent(), true);

		if (array_key_exists("id", $data)) {

			$index = $data["id"];
			self::$remaining[$index] = $data;

		} else {
			// add elements at correct index

			self::$remaining = array_replace(self::$remaining, $data);

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

			unset(self::$remaining[self::$current_answer_index]);
			apc_store(self::REMAINING, self::$remaining);
		}

		return $isCorrect;
	}

	/**
	 * Next card from remaining
	 * @return {integer} index
	 */
	public function next ()
	{
		// array_rand returns KEYS
		self::$current_answer_index = (string) array_rand(apc_fetch(self::REMAINING));

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
