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
  var currentEnd = 4;
  var photosLength;

  // Load photos to carousel
  function loadCarousel(photos){
    photosLength = photos.length
    for(var i = 0; i < photosLength; i++){
      var photo_url = photos[i].images.normal;
      // create img with photo source & modal trigger
      var image = $('<img>').attr('src', photo_url);
      $(image).attr('class', 'small');
      $(image).attr('data-toggle', 'modal');
      $(image).attr('data-target', '.lightbox');
        // Load image to lightbox modal click event
      $(image).on('click', function(event){
        var selectedImage = $(event.target).prop('src');
        $('.large').attr('src', selectedImage)
      })
      // create li
      var li = $('<li>').attr('class', 'col-md-2');
      // only show first 5
      if (i > currentEnd) {
        $(li).css('display', 'none');
      }
      $(li).append(image);
      //append to carousel
      $('ul.carousel').append(li);
    };
  };

  // Slide functions
  var slideIn = function(photo, direction){
    $($('ul.carousel').children()[photo]).show("slide", { direction: direction }, 200);
  }

  var slideOut = function(photo, direction){
    $($('ul.carousel').children()[photo]).hide("slide", { direction: direction }, 200);
    console.log(photo)  
  }

  // Advance carousel
  $('.glyphicon-chevron-right').on('click', function(){
    if (currentEnd <= photosLength && currentBegin < photosLength - 5) {
      slideOut(currentBegin, 'left');
      setTimeout(function(){
        slideIn(currentEnd, 'right')
      }, 200);
      // Increment carousel range
    currentBegin++
    currentEnd++
    }
  })

   // Rewind carousel
  $('.glyphicon-chevron-left').on('click', function(){
    if (currentBegin > 0) {
      slideOut(currentEnd, 'right');
      setTimeout(function(){
        slideIn(currentBegin, 'left')
      }, 200);
      // Decrement carousel range
      currentBegin--
      currentEnd--
    }
  })
  
});