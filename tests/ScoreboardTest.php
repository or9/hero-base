<?php

class ScoreboardTest extends TestCase {

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testGetScoreboard ()
	{
		$response = $this->call('GET', '/api/scoreboard');

		//$this->assertEquals(200, $response->getStatusCode());
	}

}
