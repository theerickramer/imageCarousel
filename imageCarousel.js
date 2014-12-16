// START OLAPIC API SCRIPT

$(document).ready(function() {	
	// Olapic Widget
	// Configure Olapic Widget
	var apiKey = '0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18';
	var mediaEndpoint = 'https://photorankapi-a.akamaihd.net/customers/215757/media/recent';

	//+++++++++++++++++++++++++++++++++++++++++

  var apiCall = '?auth_token=' + apiKey;
  var request = mediaEndpoint + apiCall

    // Fire AJAX :)
  $.ajax({  
    type: "GET", // define type of HTTP request
    url: request, // define request URL from above
    dataType: "json", // define data type that we're going to be receiving
    success: function (data) {
        // Log returned data
        console.log(data);
        loadCarousel(data.data._embedded);
      },  
      error: function(error) {
        // Log error
        console.log(error);
      }
  });

  var currentBegin = 0;
  var currentEnd = 5;
  var photosLength;

  // Load photos to carousel
  function loadCarousel(photos){
    photosLength = photos.length
    for(var i = 0; i < photosLength; i++){
      var photo_url = photos[i].images.normal;
      //create img with photo source
      var image = $('<img>').attr('src', photo_url);
      $(image).attr('class', 'small');
      //create li
      var li = $('<li>').attr('class', 'col-md-2');
      if (i >= currentEnd) {
        $(li).addClass('hidden');
      }
      $(li).append(image);
      //append to carousel
      $('ul.carousel').append(li);
    };
  };

  // Advance carousel
  $('.glyphicon-chevron-right').on('click', function(){
    if (currentEnd <= photosLength && currentBegin < photosLength - 5) {
      $($('ul.carousel').children()[currentBegin]).toggleClass('hidden');
      $($('ul.carousel').children()[currentEnd]).toggleClass('hidden');
      // Increment carousel range
      currentBegin++
      currentEnd++
    }
  })

   // Rewind carousel
  $('.glyphicon-chevron-left').on('click', function(){
    if (currentBegin > 0) {
      $($('ul.carousel').children()[currentBegin - 1]).toggleClass('hidden');
      $($('ul.carousel').children()[currentEnd - 1]).toggleClass('hidden');
      // Increment carousel range
      currentBegin--
      currentEnd--
    }
  })

});