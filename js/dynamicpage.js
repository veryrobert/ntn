

$(document).ready(function() {
  //  var bodyheight = $(document).height();
//    $(".fullscreen").height(bodyheight);


// $(window).on("load resize scroll", function(e) {
//     var bodyheight = $(document).height();
//     $(".fullscreen").height(bodyheight);
// });



$(function() {

// Sets Varibles 
    var newHash      = "",
        $mainContent = $("#main-content"),
        $content     = $(".content"),
        $fullscreen  = $(".fullscreen"),
        $pathName    = $('.link').attr('href'),
        $menu        = $('nav a'),
        $el;



// Activates click element
        
    $(".link").click( function() {
        $fullscreen.addClass('active');
        $('.close').fadeIn();
        _link = $(this).attr("href");
        history.pushState(null, null, _link);
        loadContent(_link);
     
        return false;
    });


  $('.next-button').click(function(e) {
  event.preventDefault();  
    
    var $el = $('nav a.active').removeClass('active');
    var $next = $el.parent().next();

    if ($next.length == 0) $next = $('nav li:first');     
 
    _link = $next.find('a.link').attr('href');
    history.pushState(null, null, _link);
    loadContent(_link);
    return false;

  });  

  $('.prev-button').click(function(e) {
   
  event.preventDefault();
  
  var $el = $('nav a.active').removeClass('active');
  var $prev = $el.parent().prev();
  
    if ($prev.length == 0) $prev = $('nav li:last');

   _link = $prev.find('a.link').attr('href');
    history.pushState(null, null, _link);
    loadContent(_link);
   
    return false;
   
});


 $('.close').click(function(e){

        $('.fullscreen').fadeOut();
        // link = $(this).attr("href");

        // console.log($(this).attr("href"));

        // history.pushState(null, null, _link);
        // loadContent(_link);
        // return false;

      });



    function loadContent(href){
        $mainContent
                .find("#guts")
                .fadeOut(200, function() {
                    $mainContent.hide().load(href + " #guts", function() {
                        $mainContent.fadeIn(200, function() {
                             $fullscreen.fadeIn();
                             
                     
                
                fixHeight(); 


                        });
                        $("nav a").removeClass("active");
                        $("nav a[href$='" + href + "']").addClass("active");
                    });



                });

    }
    
   $(window).bind('popstate', function(){
       _link = location.pathname.replace(/^.*[\\\/]/, ''); 
       loadContent(_link);

    });


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

var fixHeight = function(){

$('.fullscreen').css('height', $('#guts').innerHeight());

}


});



