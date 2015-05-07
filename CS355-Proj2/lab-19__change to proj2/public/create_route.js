$(document).ready(function () {
    $('#createRouteBtn').click( function(){
        var payload = {
            routeName: $('#routeName').val(),
            locationOfRoute: $('#locationOfRoute').val(),
            difficultyUS: $('#difficultyUS').val(),
            difficultyEuro: $('#difficultyEuro').val(),
            firstAscent: $('#firstAscent').val(),
            typeOfClimb: $('#typeOfClimb').val(),
            numberPitches: $('#numberPitches').val(),
            routeSetter: $('#routeSetter').val()
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