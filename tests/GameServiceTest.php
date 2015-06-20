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


	public function testAnswer ()
	{
		$gameService = new GameService;

		$isCorrect = $gameService->answer(0);
		$this->assertEquals(true, $isCorrect);

		$isCorrect = $gameService->answer("0");
		$this->assertEquals(true, $isCorrect);

	}


	public function testIncorrectAnswer ()
	{
		$gameService = new GameService;
		$isCorrect = $gameService->answer(1);
		$this->assertEquals(false, $isCorrect);

		$isCorrect = $gameService->answer("1");
		$this->assertEquals(false, $isCorrect);
	}


	public function testNaNAnswer ()
	{
		$gameService = new GameService;

		$isCorrect = $gameService->answer("herp derp");
		$this->assertEquals(false, $isCorrect);

		$isCorrect = $gameService->answer(null);
		$this->assertEquals(false, $isCorrect);
	}

	public function testNextCard ()
	{
		$gameService = new GameService;
		$gameService->add($this->mockData);

		$nextId = $gameService->next();
		$this->assertInternalType("string", $nextId);
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
