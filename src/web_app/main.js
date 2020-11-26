var baseUrlApi = "http://127.0.0.1:8000/api/"

$( document ).ready(function() {
    loadEmployees();
});

$("#btn-register").click(function(){
    var employee = {
        'name': $("#register-modal #name-input").val(),
        'email': $("#register-modal #email-input").val(),
        'admission': $("#register-modal #admission-input").val(),
        'salary': $("#register-modal #salary-input").val(),
    };
    createEmployee(employee);
});

$(document).on('click','.btn-edit', function(){
    $('#update-modal').modal();
    var employeeId = $(this).attr('id') ;
    loadEmployee(employeeId);
});

$('#btn-update').click(function(){
    var employee = {
        'name': $("#update-modal #name-input").val(),
        'email': $("#update-modal #email-input").val(),
        'admission': $("#update-modal #admission-input").val(),
        'salary': $("#update-modal #salary-input").val(),
    };
    var employeeId = $("#update-modal #id-input").val()
    updateEmployee(employeeId,employee);
})

$(document).on('click','.btn-remove', function(){
    removeEmployee($(this).prop('id'));
});



function loadEmployees(){
    Swal.showLoading();
    $.ajax({
        url: baseUrlApi + "employees",
        type: 'GET',
        success: function(data) {
            $("#list-table-body").html('');
            $.each(data, function(i,employee){
                $("#list-table-body").append('<tr class="table-active"> <th scope="row">'+employee.name+'</th> <td>'+employee.email+'</td> <td>'+employee.admission+'</td> <td>R$'+employee.salary+'</td><td><button type="button" id='+ employee.id+' class="btn btn-warning m-1 btn-edit">Editar</button><button type="button" class="btn btn-danger btn-remove" id="'+employee.id+'">Remover</button></td> </tr>')
            });
            Swal.close();
        }
    });
    
}

function loadEmployee(id){
    $.ajax({
        url: baseUrlApi + "employees/"+ id,
        type: 'GET',
        success: function(data) {
            $("#update-modal #id-input").val(data.id);
            $("#update-modal #name-input").val(data.name);
            $("#update-modal #email-input").val(data.email);
            $("#update-modal #admission-input").val(data.admission);
            $("#update-modal #salary-input").val(data.salary);
            Swal.close();
        }
    });
}


function createEmployee(data){
    Swal.showLoading();
    $.ajax({
        url: baseUrlApi + "employees",
        type: 'POST',
        data: data,
        success: function(result) {
            Swal.close();
            clearEmployeeRegister();
            Swal.fire(
                'Criado.',
                result.data['msg'],
                'success'
              ).then(function(){
                loadEmployees();
            });
        }
    });

}
function clearEmployeeRegister(){
    $("#register-modal #name-input").val('');
    $("#register-modal #email-input").val('');
    $("#register-modal #admission-input").val('');
    $("#register-modal #salary-input").val('');
}



function updateEmployee(id ,data){
    $.ajax({
        url: baseUrlApi + "employees/"+ id,
        type: 'PUT',
        data: data,
        success: function(result) {
            Swal.fire(
                'Atualizado.',
                result.data['msg'],
                'success'
              ).then(function(){
                loadEmployees();
            });
        }
    });
}

function removeEmployee(id){
    Swal.fire({
        title: 'Remover funcionario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Remover',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: baseUrlApi + "employees/"+ id,
                type: 'DELETE',
                success: function(result) {
                    Swal.fire(
                        'Removido.',
                        result.data['msg'],
                        'success'
                      ).then(function(){
                        loadEmployees();
                    });
                }
            });
        }
      })
}
