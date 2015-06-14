<?php namespace App\Services;

class GameServiceTest extends \TestCase {

	public function testGameServiceArray ()
	{
		$gameService = new GameService;
		$this->assertEquals(0, $gameService->countRemaining());
	}

	public function testAddToRemaining ()
	{
		$gameService = new GameService;
		$gameService->add("thing1");
		$gameService->add("thing1");
		$this->assertEquals(2, $gameService->countRemaining());
	}

}
