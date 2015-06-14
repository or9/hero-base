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

		$thing1 = $this->getMockCardModel(0, "thing1");
		$thing2 = $this->getMockCardModel(1, "thing2");

		$gameService->add($thing1);
		$gameService->add($thing2);
		$this->assertEquals(2, $gameService->countRemaining());
	}

	public function testAddAll ()
	{
		$gameService = new GameService;
		$mockData = [$this->getMockCardModel(3, "3 stuff"),
			$this->getMockCardModel(7, "7 stuff"),
			$this->getMockCardModel(9, "99 stuff")];

		$gameService->add($mockData);
		$this->assertEquals(3, $gameService->countRemaining());
	}

	private function getMockCardModel ($id, $content)
	{
		return Array(
			"original" => [
				"id"	=> $id,
				"name"	=> $content
			]
		);

	}

}
