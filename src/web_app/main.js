var baseUrlApi = "http://192.168.1.5:8000/api/"

$( document ).ready(function() {
    loadEmployees();
});

function loadEmployees(){
    Swal.showLoading();
    $.ajax({
        url: baseUrlApi + "employees",
        type: 'GET',
        success: function(data) {
            $("#list-table-body").html('');
            $.each(data, function(i,employee){
                $("#list-table-body").append('<tr class="table-active"> <th scope="row">'+employee.name+'</th> <td>'+employee.email+'</td> <td>'+employee.admission+'</td> <td>R$'+employee.salary+'</td><td><button type="button" class="btn btn-warning m-1">Editar</button><button type="button" class="btn btn-danger btn-remove" id="'+employee.id+'">Remover</button></td> </tr>')
            });
            Swal.close();
        }
    });
    
}

function loadEmployee(id){
    $.ajax({
        url: baseUrlApi + "employees/"+ id,
        type: 'GET',
        data: data,
        success: function(result) {
            //
        }
    });
}


function createEmployee(data){

    $.ajax({
        url: baseUrlApi + "employees/"+ data,
        type: 'POST',
        data: data,
        success: function(result) {
            //
        }
    });

}

function updateEmployee(id ,data){
    $.ajax({
        url: baseUrlApi + "employees/"+ id,
        type: 'PUT',
        data: data,
        success: function(result) {
            //
        }
    });
}
