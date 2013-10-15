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
           history.pushState({}, '', 'index.php');
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



$(function() {

 

    var newHash      = "",
        $mainContent = $("#ajax-wrap"),
        $pageWrap    = $("#content"),
        baseHeight   = 0,
        $el;
        
        $pageWrap.height($pageWrap.height());

        console.log($pageWrap);

    baseHeight = $pageWrap.height() - $mainContent.height();
    
    $("#pages").delegate("a", "click", function(e) {
        e.preventDefault();
        // console.log('sweet balss');
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        // loadContent(_link);
        return false;

    });




    function loadContent(href){
        $mainContent
                .find("#guts")
                .fadeOut(200, function() {
                    $mainContent.hide().load(href + " #guts", function() {
                        $mainContent.fadeIn(200, function() {
                            $pageWrap.animate({
                                height: baseHeight + $mainContent.height() + "px"
                            });
                        });
                        $("nav a").removeClass("current");
                        console.log(href);
                        $("nav a[href$="+href+"]").addClass("current");
                    });
                });
    }
    
    // $(window).bind('popstate', function(){
    //    _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
    //    loadContent(_link);
    // });
 
});


// next button

  $('.next-button').click(function(e) {
  event.preventDefault();  
    
    var $el = $('#pages li a.current').removeClass('current');
    var $next = $el.parent().next();
    var $wrap = $('#ajax-wrap');

     if ($next.length == 0) $next = $('#pages li:first');
     $next.find('a.link').addClass('current'); 
     window.location.href = $next.find('a.link').attr('href');
   
  });  



$('.prev-button').click(function(e) {
   
  event.preventDefault();
  
  var $el = $('#pages li a.current').removeClass('current');
  var $prev = $el.parent().prev();
  
    if ($prev.length == 0) $prev = $('#pages li:last');
  
  $prev.find('a.link').addClass('current');
  
  window.location.href = $prev.find('a.link').attr('href');
   

});


var pathArray = window.location.pathname.split( '/' );
var currentURL = pathArray[1];
var link = $('#pages li a.link');

$(link).each(function(){

var pathName = $(this).attr('href');
if (currentURL == pathName) {

  $(this).addClass('current');

}

});

});


// if (window.location.hash == "#/brandpartners") {
//     $("#brandpartners").addClass("specialbrand");
// }


// Open function

function fullscreeninstant() {

         $('.fullscreen').show();
         $('.close').show();
  
}

function fullscreen() {

         $('.fullscreen').fadeIn(400);
         $('.close').fadeIn(400);

}

