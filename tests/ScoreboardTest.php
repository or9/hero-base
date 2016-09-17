<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class ScoreboardTest extends TestCase {

	use DatabaseMigrations;
	use WithoutMiddleware;

	/**
	 * Test getScoreboard route.
	 * @return void
	 */
	public function testGetScoreboard ()
	{
		$thing = $this->call("POST", "/api/scoreboard",
			["name" => "abc", "score" => 0]);

		$response = $this->call("GET", "/api/scoreboard");
		$number = count($response->getContent());

		$this->assertEquals(200, $response->status());
		$this->assertEquals(1, $number);
	}

	/**
	 * Test save entry.
	 * @return void
	 */
	public function testSaveEntry ()
	{
		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => "tst", "score" => 9001]);

		$this->assertEquals(200, $response->status());

	}

	/**
	 * Should fail if not provided a name
	 * @return void
	 */
	public function testValidateNameNotNull ()
	{
		// In order to treat as AJAX request
		$server = array('HTTP_X-Requested-With' => 'XMLHttpRequest');

		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => null, "score" => 0],
			 array(),
			 array(),
			 $server);

		$this->assertEquals(422, $response->status());
	}

	/**
	 * Should fail if name is not a string
	 * @return void
	 */
	public function testValidateNameString ()
	{
		$server = array('HTTP_X-Requested-With' => 'XMLHttpRequest');

		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => 007, "score" => 0],
			array(),
			array(),
			$server);

		$this->assertEquals(422, $response->status());
	}

	/**
	 * Should fail if name is longer than three characters
	 * @return void
	 */
	public function testValidateNameLength ()
	{
		$server = array('HTTP_X-Requested-With' => 'XMLHttpRequest');

		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => "asdf", "score" => 0],
			array(),
			array(),
			$server);

		$this->assertEquals(422, $response->status());
	}

	public function testNameCanBeLessThan3Chars ()
	{
		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => ":)", "score" => 0]);

		$this->assertEquals(200, $response->status());
		$this->seeInDatabase("users", ["name" => ":)-"]);
	}

	/**
	 * Should not require a score
	 * @return void
	 */
	public function testValidateScoreNotRequired ()
	{
		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => "snr"]);

		$this->assertEquals(200, $response->status());
	}

	/**
	 * Should fail if score is not an integer
	 */
	public function testValidateScoreIsInt ()
	{
		$server = array('HTTP_X-Requested-With' => 'XMLHttpRequest');

		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => "sii", "score" => "nope"],
			array(),
			array(),
			$server);

		$this->assertEquals(422, $response->status());

		$response = $this->call("POST",
			"/api/scoreboard",
			["name" => "si2", "score" => 123.456],
			array(),
			array(),
			$server);

		$this->assertEquals(422, $response->status());

	}

	/**
	 * Should return 20 related users
	 */
	public function testGetRelatedUsers ()
	{

		$response = $this->call("GET", "/api/relatedUsers");

		$expectedResponse = [];
		$actualResponse = $response->getContent();

		//$this->assertEquals($expectedResponse, $actualResponse);

	}

}
