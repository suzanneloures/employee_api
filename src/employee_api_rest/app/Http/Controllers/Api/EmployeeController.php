<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{
    private $employee;

	public function __construct(Employee $employee)
	{
		$this->employee = $employee;
	}

    public function index()
    {
      
        return $this->employee->all();
    }


    public function store(Request $request)
    {

        $id = $this->employee->create($request->all());
        $message = ['data' => ['msg' => 'Funcionario inserido com sucesso!', 'status' => 201]];
		return $message;
    }

    public function show($id)
    {
        $employee = $this->employee->find($id);
        return $employee;
    }

    public function update(Request $request, $id)
    {

        $employee = $this->employee->find($id);
		$employee->update($request->all());
        $message = ['data' => ['msg' => 'Funcionario atualizado com sucesso!', 'status' => 200]];
		return $message;
       

    }

    public function destroy($id)
    {

        $employee = $this->employee->find($id);
        $employee->delete();
        $message = ['data' => ['msg' => 'Funcionario: ' . $employee->name . ' removido com sucesso!', 'status' => 200]];
		return $message;

        
    }
}
