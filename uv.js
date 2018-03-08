$(document).ready(function() {

    var loading = $("<p id='loading'>Loading...</p>")


    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getUVIndex);
        } else {
            $("#results").text("Geolocation is not supported by this browser.");
        }
    }

    //User selects a skin type and the type gets stored in a temp variable
    let skinType = "st1"
        //Take UV number and determine which UV danger scale it's on and store in a temp variable
    function uvScale(currentUV) {

        if (currentUV >= 6 && currentUV <= 8) {

            return console.log("high");
        }
        if (currentUV === 0) {

            return console.log("No worries!");
        }
    }

    function doctorSearch(docName) {
        $("#results").empty();
        let url = "https://api.betterdoctor.com/2016-03-01/doctors?" + $.param({
            name: docName,
            specialty_uid: "psychiatrist,clinical-psychologist,professional-counselor,mental-health-counselor,counselor-specialist",
            location: "ca-san-diego",
            limit: "50",
            user_key: "c09e718f2528c11e95514c5455e5dc23"

        });

        $.ajax({
            url: url,
            method: "GET"

        }).then(function(response) {

            $(response.data).each(function(index, element) {
                //console.log(element.profile.last_name + " " + element.profile.first_name);
                $("#results").append(`<h3>${element.profile.first_name}, ${element.profile.last_name}</h3><img src="${element.profile.image_url}">`)

            })

        });


    }


    function getUVIndex(position) {


        var url = "https://api.openuv.io/api/v1/uv?"
        $.ajax({
            type: 'GET',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader('x-access-token', 'de6df75a01732e5e896e6584605d2dd4');
            },
            url: url + $.param({

                lat: position.coords.latitude,
                lng: position.coords.longitude

            }),
            success: function(response) {
                let currentUV = Math.round(response.result.uv);
                $("#results").append(`<p>${response.result.uv}</p>`);
                $("#loading").toggle("hide");
                uvScale(currentUV);




            },
            error: function(response) {
                // handle error response
            }
        });
    }





    //write a switch statement: 


    $("#search-doctor").on("click", function(e) {

        e.preventDefault();
        let docName = $("#doctor-name").val();
        doctorSearch(docName);

    });

    $("#get-uv").on("click", function(e) {
        $("#results").append(loading);
        e.preventDefault();
        getLocation();


    });

});