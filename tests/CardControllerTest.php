<?php

class CardControllerTest extends TestCase {

	public function __construct ()
	{
	}

	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testGetLength ()
	{
		$response = $this->call('GET', '/api/characters/length');

		$this->assertEquals(200, $response->getStatusCode());
	}

	/**
 	 * Should get a character
	 * @return void
	 */
	public function testGetCharacterReference ()
	{
		$response = $this->call("GET", "/api/character/1");
		$this->assertEquals(200, $response->getStatusCode());
	}

	/**
	 * Should get all characters
	 * @return void
	 */
	public function testGetAllCharacterReferences ()
	{
		$response = $this->call("GET", "/api/character");
		$this->assertEquals(200, $response->getStatusCode());
	}


	/**
	 * A basic functional test example.
	 *
	 * @return void
	 */
	public function testGetSingleForm ()
	{
		$response = $this->call('GET', '/api/form/0');
		$this->assertEquals(200, $response->getStatusCode());
	}

	/**
	 * Get all forms
	 * @return void
	 */
	public function testGetAllForms ()
	{
		$response = $this->call("get", "/api/form");
		$this->assertEquals(200, $response->getStatusCode());
	}
}
