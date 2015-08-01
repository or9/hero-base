<?php namespace App\Services;


class GameServiceTest extends \TestCase {

	private $mockData = [];
	private $gameService;


	public function __construct ()
	{
		$this->gameService = new GameService;

		/*
		$this->mockData = [
			$this->getMockCardModel(0, "mock1"),
			$this->getMockCardModel(1, "mock2"),
			$this->getMockCardModel(2, "mock3")
		];
		 */

		$this->mock0 = new FakeData(0, "mock1");
		$this->mock1 = new FakeData(1, "mock2");
		$this->mock2 = new FakeData(2, "mock3");

		$this->mockData = new FakeData([
			[0, "mock1"],
			[1, "mock2"],
			[2, "mock3"]
		]);
	}

	public function testGameServiceArray ()
	{
		$this->gameService->reset();
		$this->assertEquals(0, $this->gameService->countRemaining());
	}

	public function testAddToRemaining ()
	{
		$this->gameService->reset();
		$this->gameService->add($this->mock0);
		$this->assertEquals(1, $this->gameService->countRemaining());
	}

	public function testAddAll ()
	{
		$this->gameService->reset();
		$mockAltData = new FakeData([
			[3, "3 stuff"],
			[7, "7 stuff"],
			[9, "99 stuff"]
		]);

		$this->gameService->add($mockAltData);
		$this->assertEquals(3, $this->gameService->countRemaining());
	}

	public function testCorrectAnswer ()
	{
		$this->gameService->reset();

		$mockAltData = new FakeData([
			[3, "3 stuff"],
			[0, "zero stuff"],
			[9, "99 stuff"]
		]);

		$this->gameService->add($mockAltData);
		$this->assertEquals(3, $this->gameService->countRemaining());

		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "0");

		$isCorrect = $this->gameService->answer(0);
		$this->assertEquals("true", $isCorrect);

		$isCorrect = $this->gameService->answer("0");
		$this->assertEquals("true", $isCorrect);

		$this->assertEquals(2, $this->gameService->countRemaining());

		apc_delete("GAME_SERVICE_CURRENT_ANSWER_INDEX");

	}


	public function testIncorrectAnswer ()
	{
		$this->gameService->reset();
		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "0");

		$isCorrect = $this->gameService->answer(1);
		$this->assertEquals("false", $isCorrect);

		$isCorrect = $this->gameService->answer("1");
		$this->assertEquals("false", $isCorrect);

		apc_delete("GAME_SERVICE_CURRENT_ANSWER_INDEX");
	}


	public function testNaNAnswer ()
	{
		$this->gameService->reset();
		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "0");

		$isCorrect = $this->gameService->answer("herp derp");
		$this->assertEquals("false", $isCorrect);

		$isCorrect = $this->gameService->answer(null);
		$this->assertEquals("false", $isCorrect);

		apc_delete("GAME_SERVICE_CURRENT_ANSWER_INDEX");
	}

	public function testNextCard ()
	{
		$this->gameService->reset();
		//apc_store("GAME_SERVICE_REMAINING", [[ "id" => 123], [ "id" =>
			//321 ]]);
		apc_store("GAME_SERVICE_CURRENT_ANSWER_INDEX", "0");

		$this->gameService->add($this->mock2);

		$nextId = $this->gameService->next();
		$this->assertInternalType("string", $nextId);

		apc_delete("GAME_SERVICE_CURRENT_ANSWER_INDEX");
		//apc_delete("GAME_SERVICE_REMAINING");
	}


	private function getMockCardModel ($id, $content)
	{
		return new FakeData($id, $content);

	}


}

class FakeData {

	private $content;

	public function __construct ($id, $name = null) {

		if (is_array($id)) {
			foreach($id as list($i, $n)) {
				$this->content[] = (object) [
					"id"	=> $i,
					"name"	=> $n
				];
			}

		} else {

			$this->content = (object) array(
				"id"	=> $id,
				"name"	=> $name
			);
		}
	}

	public function getContent ()
	{
		if (is_array($this->content)) {


		} else {

		}

		return json_encode($this->content);

	}
}
