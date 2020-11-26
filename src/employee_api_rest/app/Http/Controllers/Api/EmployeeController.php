<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

class EmployeeController extends Controller
{

    public function index()
    {
        $employee = Employee::all();
        return $employee;
    }


    public function store(Request $request)
    {
        Employee::create($request->all());
    }

    public function show($id)
    {
        $employee = Employee::findOrfail($id);
        return $employee;
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::findOrfail($id);
        $employee->update($request->all());

    }

    public function destroy($id)
    {
        $employee = Employee::findOrfail($id);
        $employee->delete();
    }
}
