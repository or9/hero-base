<?php

class GameTest extends TestCase {

	/**
	 * A basic functional test example.
	 * @return void
	 */
	public function testGetGameSetsCurrent ()
	{
		$response = $this->call('GET', '/api/character');
		//$this->assertEquals(200, $response->getStatusCode());
	}

}

