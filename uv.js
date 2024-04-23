$(document).ready(function () {
  var loading = 'Loading...';
  var currentUV;
  var uvScale;
  var skinType;
  var allExposures;
  var safeExposure;

  //Precaution messages based on UV status
  const precautions = {
    low: "<p class='alert alert-success'>Wear sunscreen SPF 30+ and sunglasses.</p>",
    moderate:
      "<p class='alert alert-warning'>Wear sunscreen SPF 30+, sunglasses, hat, and protective clothing.</p>",
    high: "<p class='alert alert-warning'>Wear sunscreen SPF 30+, sunglasses, hat, protective clothing, and seek shade.</p>",
    'very high':
      "<p class='alert alert-danger'>Wear sunscreen SPF 30+, sunglasses, hat, protective clothing, seek shade, and limit time outside.</p>",
    'extremely high':
      "<p class='alert alert-danger'>Wear unscreen SPF 30+, sunglasses, hat, protective clothing, seek shade, and stay inside.</p>",
  };

  const skinTypes = [
    'very fair',
    'fair',
    'cream white',
    'olive',
    'brown',
    'dark brown/black',
  ];

  //Appends skin type buttons after the user requests current UV index
  function skinTypeButtons() {
    for (let i = 0; i < skinTypes.length; i++) {
      let col = $(`<div class="text-center col-6 col-sm-4">`);
      let icon = $(
        `<i value="st${i + 1}" class="fas fa-user skin-type st${
          i + 1
        } btn"></i>`
      );
      let description = $(`<p>${skinTypes[i]}</p>`);
      col = $(col).append(icon).append(description);

      $('#skin-buttons').append(col);
    }
  }

  //Gets user's current location and calls the function that makes the API call for current UV index
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getUVIndex, showError);
    } else {
      $('#vitd-recommendation').text(
        'Geolocation is not supported by this browser.'
      );
    }
  }

  //Geolocation errors
  function showError(error) {
    let x = document.getElementById('vitd-recommendation');
    switch (error.code) {
      case error.PERMISSION_DENIED:
        x.innerHTML = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        x.innerHTML = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        x.innerHTML = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        x.innerHTML = 'An unknown error occurred.';
        break;
    }
  }

  //Takes current UV index from API call and returns a UV status phrase
  function getUvScale(currentUV) {
    switch (true) {
      case currentUV === 0:
        return 'completely safe';

      case currentUV >= 1 && currentUV <= 2:
        return 'low';

      case currentUV >= 3 && currentUV <= 5:
        return 'moderate';

      case currentUV >= 6 && currentUV <= 7:
        return 'high';

      case currentUV >= 8 && currentUV <= 10:
        return 'very high';

      case currentUV > 11:
        return 'extremely high';
    }
  }

  //Converts exposure time minutes from API call to hours and minutes
  function convertExposureTime(minutes) {
    let h = parseInt(minutes / 60);
    let m = minutes % 60;

    if (minutes >= 60) {
      return `${h} hour(s) and ${m} minute(s)`;
    } else {
      return `${m} minute(s)`;
    }
  }

  //Takes the current UV index from API call and recommends Vit D and safe exposure times
  function recommendVitD(currentUV) {
    //Runs the function that takes the UV index and converts it to a UV status message
    let UVStatus = getUvScale(currentUV);

    //Vit D exposure times based on skin types. Skin-type word (e.g. st1) are returned from API call
    let exposureTime = {
      st1: {
        low: '15-20',
        moderate: '10-15',
        high: '5-10',
        'very high': '2-8',
        'extremely high': '1-5',
      },

      st2: {
        low: '20-30',
        moderate: '15-20',
        high: '10-15',
        'very high': '5-10',
        'extremely high': '2-8',
      },

      st3: {
        low: '20-40',
        moderate: '20-30',
        high: '15-20',
        'very high': '10-15',
        'extremely high': '5-10',
      },

      st4: {
        low: '40-60',
        moderate: '30-40',
        high: '20-30',
        'very high': '15-20',
        'extremely high': '10-15',
      },
      st5: {
        low: '60-80',
        moderate: '40-60',
        high: '30-40',
        'very high': '20-30',
        'extremely high': '15-20',
      },
      st6: {
        low: '',
        moderate: '60-80',
        high: '40-60',
        'very high': '30-40',
        'extremely high': '20-30',
      },
    };

    //Gets recommended exposure time based on skin type
    let recommendExposureTime = function (skinType) {
      return exposureTime[skinType][UVStatus];
    };

    //Appends the Vit D and safe exposure time message to the DOM
    let appendVitDMessage = function () {
      // expRange = expRange
      let message = `<p class="text-center">Time for vitamin D intake: <span class="accent">${recommendExposureTime(
        skinType
      )} minutes</span> </p> <p class="text-center">Safe time before you burn: <span class="accent">${safeExposure}</span></p>`;
      $('#vitd-recommendation').html(message);
    };

    appendVitDMessage();
  }

  //User clicks to get current UV index
  $(document).on('click', '#get-uv', function (e) {
    e.preventDefault();

    $('#uv-value').text('...');
    $('#value-status').text(loading);
    $('#scale').remove();

    skinTypeButtons();
    getLocation();
  });

  //User clicks a skin type and gets vit D and safe exposure time recommendations
  $(document).on('click', '.skin-type', function () {
    $('#collapseOne').toggleClass('show');
    skinType = $(this).attr('value');
    safeExposure = allExposures[skinType];
    console.log(safeExposure);
    safeExposure = convertExposureTime(safeExposure);
    recommendVitD(currentUV);
  });

  //Makes an API call for current UV index based on user's current location
  function getUVIndex(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    var url = 'https://api.openuv.io/api/v1/uv?';
    $.ajax({
      type: 'GET',
      dataType: 'json',
      beforeSend: function (request) {
        request.setRequestHeader(
          'x-access-token',
          'de6df75a01732e5e896e6584605d2dd4'
        );
      },
      url:
        url +
        $.param({
          lat: latitude,
          lng: longitude,
        }),
      success: function (response) {
        currentUV = Math.round(response.result.uv);
        uvScale = getUvScale(currentUV);
        allExposures = response.result.safe_exposure_time;

        $('#uv-value').text(currentUV);
        $('#value-status').text(uvScale);
        $('#vitd-recommendation').html(precautions[uvScale]);

        //Display white card where the user selects skin type for vit D recommendations
        if (uvScale === 'completely safe') {
          $('#vitd-recommendation').append(
            "<p class='text-center'>Not enough UV present for an accurate estimate of vitamin D intake.</p>"
          );
        } else {
          $('.card-panel').removeClass('hide');
        }
      },
      error: function (response) {
        $('#vitd-recommendation').html(
          "<p class='alert alert-danger'>Error processing your request, please try again.</p>"
        );
      },
    });
  }
});
