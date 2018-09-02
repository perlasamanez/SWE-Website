$(function() {

    $("#newsColl input,#newsColl textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var firstname = $("input#namecoll").val();
            var lastname = $("input#lastcoll").val();
            var email = $("input#emailcoll").val();
            $.ajax({
                url: "/mail/news_college.php",
                type: "POST",
                data: {
                    email: email,
                    first: firstname,
                    last: lastname,
                },
                cache: false,
                success: function(data) {
                    if (data){
                        console.log("Cool");
                    } else {
                        console.log("Uh oh");
                    }

                    // victory message
                    $('#victory').html("<div class='alert alert-success'>");
                    $('#victory > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#victory > .alert-success')
                        .append("<strong>Your are now subscribed! </strong>");
                    $('#victory > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#newsColl').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#victory').html("<div class='alert alert-danger'>");
                    $('#victory > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#victory > .alert-danger').append($("<strong>").text("Sorry " + firstname + ", it seems that my server is not responding. Please try again later!"));
                    $('#victory > .alert-danger').append('</div>');
                    //clear all fields now
                    $('#newsColl').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/victory boxes */
$('#name').focus(function() {
    $('#victory').html('');
});
