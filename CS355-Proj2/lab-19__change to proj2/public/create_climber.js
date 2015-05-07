$(document).ready(function () {
    $('#createClimberBtn').click( function(){
        var payload = {
            climberName: $('#climberName').val(),
            hardestGradeUS: $('#hardestGradeUS').val(),
            hardestGradeEuro: $('#hardestGradeEuro').val(),
            country: $('#country').val(),
            birthYear: $('#birthYear').val(),
            routeID: $('#routeID').val()
        };

        $.ajax({
            url: $("#create_user_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});