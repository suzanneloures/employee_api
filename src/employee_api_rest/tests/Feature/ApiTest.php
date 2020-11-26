<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{

    public function test_get_json_employee_return_sucess()
    {
        $response = $this->getJson('/api/employees');
        $response->assertStatus(200);
    }

    public function test_post_json_employee_return_create()
    {
        $response = $this->postJson('/api/employees', ['name' => 'Funcionario', 'email'=>'funciorioteste@hotmail.com', "admission" => '2020-01-01', 'salary' => '1500']);
        $response
            ->assertStatus(201)
            ->assertJson([
                'data' => [
                    'status' => 201,
                ]
            ]);
    }
}
