$(document).ready(function() {

    var loading = "Loading..."
    var currentUV;
    var uvScale;
    var skinType;
    var allExposures;
    var safeExposure;
    var latitute;
    var longitute;


    const precautions = {


        "low": "<p class='alert alert-success'>Wear sunscreen SPF 30+ and sunglasses.</p>",
        "moderate": "<p class='alert alert-warning'>Wear sunscreen SPF 30+, sunglasses, hat, and protective clothing.</p>",
        "high": "<p class='alert alert-warning'>Wear sunscreen SPF 30+, sunglasses, hat, protective clothing, and seek shade.</p>",
        "very high": "<p class='alert alert-danger'>Wear sunscreen SPF 30+, sunglasses, hat, protective clothing, seek shade, and limit time outside.</p>",
        "extremely high": "<p class='alert alert-danger'>Wear unscreen SPF 30+, sunglasses, hat, protective clothing, seek shade, and stay inside.</p>"

    }

    const skinTypes = ["very fair", "fair", "cream white", "olive", "brown", "dark brown/black"]

    function skinTypeButtons() {
        for (i = 0; i < skinTypes.length; i++) {

            let col = $("<div class='text-center col-6 col-sm-4'>");
            let icon = $(`<i value="st${i+1}" class="fas fa-user skin-type st${i+1} btn"></i>`)
            let description = $(`<p>${skinTypes[i]}</p>`)
            col = $(col).append(icon).append(description);

            $("#skin-buttons").append(col);


        }
    }



    function getLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getUVIndex);
        } else {
            $("#results").text("Geolocation is not supported by this browser.");
        }
    }



    //Take UV number and determine which UV danger scale it's on and store in a temp variable
    function getUvScale(currentUV) {

        if (currentUV === 0) {

            return "completely safe"
        }

        if (currentUV >= 1 && currentUV <= 2) {

            return "low"
        }

        if (currentUV >= 3 && currentUV <= 5) {

            return "moderate"
        }

        if (currentUV >= 6 && currentUV <= 7) {

            return "high"
        }

        if (currentUV >= 8 && currentUV <= 10) {

            return "very high"
        }

        if (currentUV > 11) {

            return "extremely high"
        }
        if (currentUV === 0) {

            return "no worries"
        }
    }


    function convertExposureTime(minutes) {

        let h = parseInt(minutes / 60);
        let m = minutes % 60;

        if (minutes > 60) {

            return `${h} hour(s) and ${m} minute(s)`
        } else {

            return `${m} minute(s)`

        }
    }


    function recommendVitD(currentUV) {
        currentUV = getUvScale(currentUV);
        noUVmessage = "<p class='text-center'>Not enough UV present for an accurate estimate of vitamin D intake.</p>"
        vitDMessage = function(vitRange, expRange) {
            expRange = expRange
            return `<p class="text-center">Time for vitamin D intake: <span class="accent">${vitRange} minutes</span> </p> <p class="text-center">Safe time before you burn: <span class="accent">${expRange}</span></p>`


        }
        switch (skinType) {

            case "st1":

                switch (currentUV) {
                    case "completely safe":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "low":
                        $("#vitd-recommendation").html(vitDMessage("15-20", safeExposure));
                        break;
                    case "moderate":
                        $("#vitd-recommendation").html(vitDMessage("10-15", safeExposure));
                        break;
                    case "high":
                        $("#vitd-recommendation").html(vitDMessage("5-10", safeExposure));
                        break;
                    case "very high":
                        $("#vitd-recommendation").html(vitDMessage("2-8", safeExposure));
                        break;
                    case "extra high":
                        $("#vitd-recommendation").html(vitDMessage("1-5", safeExposure));
                        break;


                }

                break;

            case "st2":

                switch (currentUV) {
                    case "completely safe":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "low":
                        $("#vitd-recommendation").html(vitDMessage("20-30", safeExposure));
                        break;
                    case "moderate":
                        $("#vitd-recommendation").html(vitDMessage("15-20", safeExposure));
                        break;
                    case "high":
                        $("#vitd-recommendation").html(vitDMessage("10-15", safeExposure));
                        break;
                    case "very high":
                        $("#vitd-recommendation").html(vitDMessage("5-10", safeExposure));
                        break;
                    case "extra high":
                        $("#vitd-recommendation").html(vitDMessage("2-8", safeExposure));
                        break;


                }

            case "st3":

                switch (currentUV) {
                    case "completely safe":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "low":
                        $("#vitd-recommendation").html(vitDMessage("30-40", safeExposure));
                        break;
                    case "moderate":
                        $("#vitd-recommendation").html(vitDMessage("20-30", safeExposure));
                        break;
                    case "high":
                        $("#vitd-recommendation").html(vitDMessage("15-20", safeExposure));
                        break;
                    case "very high":
                        $("#vitd-recommendation").html(vitDMessage("10-15", safeExposure));
                        break;
                    case "extra high":
                        $("#vitd-recommendation").html(vitDMessage("5-10", safeExposure));
                        break;


                }

                break;

            case "st4":

                switch (currentUV) {
                    case "completely safe":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "low":
                        $("#vitd-recommendation").html(vitDMessage("40-60", safeExposure));
                        break;
                    case "moderate":
                        $("#vitd-recommendation").html(vitDMessage("30-40", safeExposure));
                        break;
                    case "high":
                        $("#vitd-recommendation").html(vitDMessage("20-30", safeExposure));
                        break;
                    case "very high":
                        $("#vitd-recommendation").html(vitDMessage("15-20", safeExposure));
                        break;
                    case "extra high":
                        $("#vitd-recommendation").html(vitDMessage("10-15", safeExposure));
                        break;


                }

                break;

            case "st5":

                switch (currentUV) {
                    case "completely safe":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "low":
                        $("#vitd-recommendation").html(vitDMessage("60-80", safeExposure));
                        break;
                    case "moderate":
                        $("#vitd-recommendation").html(vitDMessage("40-60", safeExposure));
                        break;
                    case "high":
                        $("#vitd-recommendation").html(vitDMessage("30-40", safeExposure));
                        break;
                    case "very high":
                        $("#vitd-recommendation").html(vitDMessage("20-30", safeExposure));
                        break;
                    case "extra high":
                        $("#vitd-recommendation").html(vitDMessage("15-20", safeExposure));
                        break;


                }

                break;

            case "st6":

                switch (currentUV) {
                    case "completely safe":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "low":
                        $("#vitd-recommendation").html(noUVmessage);
                        break;
                    case "moderate":
                        $("#vitd-recommendation").html(vitDMessage("60-80", safeExposure));
                        break;
                    case "high":
                        $("#vitd-recommendation").html(vitDMessage("40-60", safeExposure));
                        break;
                    case "very high":
                        $("#vitd-recommendation").html(vitDMessage("30-40", safeExposure));
                        break;
                    case "extra high":
                        $("#vitd-recommendation").html(vitDMessage("20-30", safeExposure));
                        break;
                }

                break;



        }




    }




    $(document).on("click", "#get-uv", function(e) {
        e.preventDefault();


        $("#uv-value").text("...");
        $("#value-status").text(loading);
        $("#scale").remove();

        skinTypeButtons();
        getLocation();



    });

    $(document).on("click", ".skin-type", function() {

        $("#collapseOne").toggleClass("show");
        skinType = $(this).attr("value");
        safeExposure = allExposures[skinType]
        console.log(safeExposure);
        safeExposure = convertExposureTime(safeExposure)
        recommendVitD(currentUV);



    });


    function getUVIndex(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        var url = "https://api.openuv.io/api/v1/uv?"
        $.ajax({
            type: 'GET',
            dataType: 'json',
            beforeSend: function(request) {
                request.setRequestHeader('x-access-token', 'de6df75a01732e5e896e6584605d2dd4');
            },
            url: url + $.param({

                lat: latitude,
                lng: longitude

            }),
            success: function(response) {
                currentUV = Math.round(response.result.uv);
                uvScale = getUvScale(currentUV)
                allExposures = response.result.safe_exposure_time

                //$("#vitd-recommendation").attr("class", "alert alert-info")
                $("#uv-value").text(currentUV);
                $("#value-status").text(uvScale);
                $(".card-panel").removeClass("hide");
                $("#vitd-recommendation").html(precautions[uvScale])







            },
            error: function(response) {
                // handle error response
            }
        });
    }





});