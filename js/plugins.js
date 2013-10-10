$(document).ready(function(){

$('.open').click(function(){
    $('.fullscreen').fadeIn('fullscreen_show');
       $('.fullscreen').show('fullscreen_show');

    $('.close').fadeIn('.close');
       $('.close').show('.close');


  });

$('.close').click(function(){
    $('.fullscreen').fadeOut('fullscreen_show');
       $('.fullscreen').hide('fullscreen_show'); 


      $('.close').fadeOut('.close');
       $('.close').hide('.close');

});


$(function () {
    // attaching click handler to links
    $("a.open").click(function (e) {
        // cancel the default behaviour
        e.preventDefault();

        // get the address of the link
        var href = $(this).attr('href');
        // getting the desired element for working with it later
        var $wrap = $('#ajax-wrap');

        $wrap
            // removing old data
            .html('')
            // load the remote page
            .load(href + '#content');
    });

});

// Lazy load
  $(function() {
    $(".lazy").lazyload({
      effect : "fadeIn",
      effectspeed : 900
    });
  });


  // Below is the love I have for Sean "Code Like a M*ther F*cking Boss" Mongey

  $.stellar({
    horizontalScrolling: false,
    verticalOffset: 0,
    responsive: true
  });

  // Loads of love


  // Hover for images

    $('.images').hover(function(){
      $(this).find('.imglink').addClass('active');
        },
      function(){
        console.log('hovered out');   
         $('.imglink').removeClass('active');
      });


});










