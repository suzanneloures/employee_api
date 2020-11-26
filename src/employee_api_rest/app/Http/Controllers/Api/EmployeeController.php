<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;
use Validator;
use Illuminate\Http\Response;

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

    public function make_validator($values){
        $validator = Validator::make($values, [
            'name' => 'required|max:100',
            'email' => 'email|required|max:100',
            'salary' => 'required|numeric',
            'admission'=> 'date|required'
        ]);
        return $validator;
    }

    public function store(Request $request)
    {
        $validator = $this->make_validator($request->all());
        if($validator->fails()){
            $message = ['data' => ['error' => $validator->errors()->all(), 'status' => 400]];
            return response()->json($message,400);
        }
        $id = $this->employee->create($request->all());
        $message = ['data' => ['msg' => 'Funcionario inserido com sucesso!', 'status' => 201]];
		return response()->json($message,201);
    }

    public function show($id)
    {
        $employee = $this->employee->find($id);
        return $employee;
    }

    public function update(Request $request, $id)
    {
        $validator = $this->make_validator($request->all());
        if($validator->fails()){
            $message = ['data' => ['error' => $validator->errors()->all(), 'status' => 400]];
            return response()->json($message,400);
        }
        $employee = $this->employee->find($id);
		$employee->update($request->all());
        $message = ['data' => ['msg' => 'Funcionario atualizado com sucesso!', 'status' => 200]];
		return response()->json($message,200);
       

    }

    public function destroy($id)
    {

        $employee = $this->employee->find($id);
        $employee->delete();
        $message = ['data' => ['msg' => 'Funcionario: ' . $employee->name . ' removido com sucesso!', 'status' => 200]];
		return $message;

        
    }
}
