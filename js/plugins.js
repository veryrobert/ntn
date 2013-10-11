if ( !$('body').hasClass('home') ) {

  fullscreeninstant();

}

$(document).ready(function(){

  // attaching click handler to links
  $("a.open").click(function(e) {
      // cancel the default behaviour
      fullscreen();
      e.preventDefault();

      var url =  $(this).attr('href');

      history.pushState({},'', url);

      // get the address of the link
      var href = $(this).attr('href');
      // getting the desired element for working with it later
      var $wrap = $('#ajax-wrap');

      $wrap
          // removing old data
          .html('')
          // load the remote page
          .load(href + ' #content');

  });

//  Closing button
  $('.close').click(function(){
    $('.fullscreen').fadeOut('fullscreen_show');
       history.pushState({}, '', 'ajax.php');
      $('.close').fadeOut('.close');

  });


// Lazy load
  $(function() {
    $(".lazy").lazyload({
      effect : "fadeIn",
      effectspeed : 900
    });
  });

// Parrallax
  $.stellar({
    horizontalScrolling: false,
    verticalOffset: 0,
    responsive: true
  });

// Hover for images
$('.images').hover(function(){
    $(this).find('.imglink').addClass('active');
    },
    function(){
     $('.imglink').removeClass('active');
  });

});





// Open function

function fullscreeninstant() {

         $('.fullscreen').show();
         $('.close').show();
  
}

function fullscreen() {

         $('.fullscreen').fadeIn(400);
         $('.close').fadeIn(400);

}






