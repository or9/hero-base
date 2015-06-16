<?php namespace App\Services;

class GameServiceTest extends \TestCase {

	private $mockData = [];
	private $gameService;


	public function __construct ()
	{
		$this->gameService = new GameService;

		$this->mockData = [
			$this->getMockCardModel(0, "mock1"),
			$this->getMockCardModel(1, "mock2"),
			$this->getMockCardModel(2, "mock3")
		];
	}

	public function testGameServiceArray ()
	{
		$this->assertEquals(0, $this->gameService->countRemaining());
	}

	public function testAddToRemaining ()
	{
		$this->gameService->add($this->mockData[0]);
		$this->assertEquals(1, $this->gameService->countRemaining());
	}

	public function testAddAll ()
	{
		$gameService = new GameService;
		$mockAltData = [$this->getMockCardModel(3, "3 stuff"),
			$this->getMockCardModel(7, "7 stuff"),
			$this->getMockCardModel(9, "99 stuff")];

		$gameService->add($mockAltData);
		$this->assertEquals(count($mockAltData), $gameService->countRemaining());
	}

	public function testModifyRemainingWithArrays ()
	{
		$gameService = new GameService;

		$mockAltData = [
			$this->getMockCardModel(99, "red balloons"),
			$this->getMockCardModel(33, "blue baboons")
		];

		$gameService->add($this->mockData);
		$gameService->add($mockAltData);

		$this->assertEquals(
			count($this->mockData) + count($mockAltData),
			$gameService->countRemaining()
		);

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
