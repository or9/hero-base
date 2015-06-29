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
		$this->gameService->reset();
		$this->assertEquals(0, $this->gameService->countRemaining());
	}

	public function testAddToRemaining ()
	{
		$this->gameService->reset();
		$this->gameService->add($this->mockData[0]);
		$this->assertEquals(1, $this->gameService->countRemaining());
	}

	public function testAddAll ()
	{
		$this->gameService->reset();
		$mockAltData = [$this->getMockCardModel(3, "3 stuff"),
			$this->getMockCardModel(7, "7 stuff"),
			$this->getMockCardModel(9, "99 stuff")];

		$this->gameService->add($mockAltData);
		$this->assertEquals(count($mockAltData), $this->gameService->countRemaining());
	}

	public function testModifyRemainingWithArrays ()
	{
		$this->gameService->reset();

		$mockAltData = [
			$this->getMockCardModel(99, "red balloons"),
			$this->getMockCardModel(33, "blue baboons")
		];

		$this->gameService->add($this->mockData);
		$this->gameService->add($mockAltData);

		$this->assertEquals(
			count($this->mockData) + count($mockAltData),
			$this->gameService->countRemaining()
		);

	}


	public function testAnswer ()
	{
		$this->gameService->reset();

		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "0");

		//$this->gameService->add($this->mockData[0]);
		$isCorrect = $this->gameService->answer(0);
		$this->assertEquals("true", $isCorrect);

		$isCorrect = $this->gameService->answer("0");
		$this->assertEquals("true", $isCorrect);

		apc_delete("GAME_SERVICE_CURRENT_ANSWER_INDEX");

	}


	public function testIncorrectAnswer ()
	{
		$this->gameService->reset();
		$isCorrect = $this->gameService->answer(1);
		$this->assertEquals("false", $isCorrect);

		$isCorrect = $this->gameService->answer("1");
		$this->assertEquals("false", $isCorrect);
	}


	public function testNaNAnswer ()
	{
		$this->gameService->reset();

		$isCorrect = $this->gameService->answer("herp derp");
		$this->assertEquals("false", $isCorrect);

		$isCorrect = $this->gameService->answer(null);
		$this->assertEquals("false", $isCorrect);
	}

	public function testNextCard ()
	{
		$this->gameService->reset();
		$this->gameService->add($this->mockData);

		$nextId = $this->gameService->next();
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
