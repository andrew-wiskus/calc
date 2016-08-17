console.log("works");

$(document).ready(function() {

    $('button').on("click", function() {
        console.log(this.id);
        $.ajax({
            type: "POST",
            url: '/calc',
            data: {
                input: this.id
            },
            success: function(data) {
                console.log("works?");
                console.log(data.display);
                $('#output').text(data.display);
            }
        });
        //console.log(5(40));


    });






});
