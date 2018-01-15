// add an event listener to the shorten button for when the user clicks it
$('#shortly-btn').on('click', function(){
    // AJAX call to /api/shorten with the URL that the user entered in the input box
    $.ajax({
      url: '/shorten',
      type: 'POST',
      dataType: 'JSON',
      data: {url: $('#user-url').val()},
      success: function(data){
          // display the shortened URL to the user that is returned by the server
          var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
              + data.shortUrl + '</a>';
          $('#output-url').html(resultHTML);
          console.log(data);
          //$('#link').hide().fadeIn('slow');
      }
    });
  
  });