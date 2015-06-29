<?php

//use \App\Services\GameService;

class GameControllerTest extends TestCase {

	//private $gameService;
	//private $cardController;

	public function setUp ()
	{
		parent::setUp();
		//$this->gameService = Mockery::mock("GameService");
		//$this->app->instance("\App\Services\GameService",
		//	$this->gameService);
		//App::instance("GameService", $this->gameService);

		// Error: must be an instance of GameService, instance of
		// Mockery_0__GameService given
		//$this->cardController = new CardController($this->gameService);
	}

	public function tearDown ()
	{
		//Mockery::close();
		parent::tearDown();
	}

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testGetAnswerCorrect ()
	{
		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "99");
		$response = $this->call('GET', '/api/answer/99');

		$this->assertEquals(200, $response->getStatusCode());
		$this->assertEquals("true", $response->getContent());
	}

	public function testGetAnswerIncorrect ()
	{
		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "123");
		$response = $this->call("GET", "/api/answer/1");
		$this->assertEquals(200, $response->getStatusCode());
		$this->assertEquals("false", $response->getContent());
		apc_delete("GAME_SERVICE_CURRENT_ANSWER_INDEX");
	}

	public function testRequiresAnswerId ()
	{
		$response = $this->call("GET", "/api/answer");
		$this->assertEquals(302, $response->getStatusCode());

	}

	/**
 	 * Should get a character
	 * @return void
	 */
	public function testGetNextCard ()
	{
		$response = $this->call("GET", "/api/next");
		$this->assertEquals(200, $response->getStatusCode());
		$this->assertInternalType("string", $response->getContent());
	}


	/**
	 * Should update GameService with values
	 * @return void
	 */
	/*public function testCallGameService ()
	{

		//$this->cardController = new CardController($this->gameService);
		$this->gameService->shouldReceive("add")->once()->andReturn(array());
		$this->call("GET", "/api/character");
		$this->action("GET", "CardController@character");

		//$this->gameService->add(1234);

		//$this->assertGreaterThan(0, $this->gameService->countRemaining());
	}*/
}
