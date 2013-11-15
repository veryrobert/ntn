$(document).ready(function() {

// - - - - - - - - - - - - - - - - Doing some cookie stuff below – - - - - - - - - - - - - - //    
   
    cookieStuff(10);

    $(".close").attr("href", '/');

    if ($("#homepage-flag").length > 0) {
        $.removeCookie('lastclicked');
        $(".close").attr("href", '/');
    }



// - - - - - - - - - - - - - - - - Next and Previous Button below – - - - - - - - - - - - - - //    


$(".pages").click(function(){
    
    var $this = $(this);
    var href = $(this).attr('href');

    if($this.data('clicked', true)) {
        lastClicked = $.cookie('lastclicked', $this.attr('href'));
        console.log(lastClicked);
        $("nav#main-nav a[href$='" + href + "']").addClass("active");
        $(".close").attr("href", $.cookie('lastclicked'));
    }

});




 $('a.next-button, a.prev-button').click(function(e) {
  event.preventDefault();  
    
    var $el = $('#pages a.active').removeClass('active');
    var $next = $el.parent().next();
    var $prev = $el.parent().prev();
    var fullTop = $('.fullscreen').scrollTop();
    
    if (fullTop == 0) {
    } else {
        setTimeout(function() {
            $('.fullscreen').scrollTop(0);
        }, 300);
    }


if($(this).hasClass('next-button')) {

     if ($next.length == 0) $next = $('#pages li:first');
        $next.find('a.link').addClass('active');
        _link = $next.find('a.link').attr('href');
        

} else {

    if ($prev.length == 0) $prev = $('#pages li:last');
    $prev.find('a.link').addClass('active');
    _link = $prev.find('a.link').attr('href'); 

}

history.pushState(null, null, _link);
productLoad(_link);
return false;
   
});  





// - - - - - - - - - - - - - - - - Page bits and click function below – - - - - - - - - - - - - - //    


    $('#page-content').hide().fadeIn('fast');

    //_link = location.pathname.replace(/^.*[\\\/]/, '');
    // loadContent(_link);


    clicky();

    pageBits();

}); // end doc ready


// variables

var newHash = '';
//$pageContent = $('#page-content');
$guts        = $('#guts');
$content     = $('.content, .collection');
$fullscreen  = $('.fullscreen');
$pathName    = $('.link').attr('href');
$menu        = $('nav#pages a');
$mainNav     = $('nav#main-nav a');
$nextandprev = $('.nextandprev');
$prev        = $('.prev-button');
$next        = $('.next-button');
$link        = $('.link, .pages');
$pages       = $('.pages');
$el          = $('#pages a.active').removeClass('active');



function pageLoad(linkPage) {


    history.pushState(null, null, linkPage);
        $("#page-content").load(linkPage + " #guts", function(){   
        $('.collection').addClass('active');
        $('.content, .close, .nextandprev, #product-content').removeClass('active');
    });

}

function productLoad(linkPage) {

    $('#page-content, .logo, #main-nav').fadeOut(300, function(){

        $fullscreen.addClass('active').hide().fadeIn(300);
        $('body').addClass('overlay');
        history.pushState(null, null, linkPage);
        $("#product-content").load(linkPage + " #guts", function(){
        $('.content, .close, .nextandprev, #product-content').addClass('active').hide().fadeIn(200);
        });

    });

}



// page requirements

function pageBits() {
    // Lazy load
    $(function() {
        $(".lazy").lazyload({
            effect: "fadeIn",
            effectspeed: 900,
            failure_limit: 15,
            threshold : 100
        });
        $(window).trigger('resize');
    });
    // Parrallax
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0,
        responsive: false
    });
    // Hover for images
    $('.images').hover(function() {
        $(this).find('.imglink').addClass('active');
    }, function() {
        $('.imglink').removeClass('active');
    });
}


// Cookie Monster
function cookieStuff(duration){

    var date = new Date();
    var minutes = duration;

    date.setTime(date.getTime() + (minutes * 60 * 1000));
    if ($.cookie('test_status') != '1') {
        //show popup here
        $('.welcome-overlay').css('display', 'block'), function() {
            $('p').fadeIn();
        };
        $.cookie('test_status', '1', {
            expires: date
        });
    } else {
        $('.welcome-overlay').css('display', 'none');
    }
    // $.removeCookie('test_status');

    $('.welcome-overlay a').click(function() {
        $('.welcome-overlay').fadeOut(500);
    });

}

// Click function for links

function clicky() {
    $link.click(function(e) {
        e.preventDefault();
        var linkPage = $(this).attr('href');

console.log(linkPage);

        if ($(this).hasClass('pages')){

            // PAGE specific code
            if ($('body').scrollTop() != 0) {
                $('body').animate({ scrollTop: 0 }, 500, function(){
                    pageLoad(linkPage);

                });
            } else { 
                pageLoad(linkPage); 
            }
    

        } else {

            // PRODUCT specific code
            if ($('body').scrollTop() != 0) {
                $('body').animate({ scrollTop: 0 }, 500, function(){
                    productLoad(linkPage);
                });
            } else { 
                // productLoad(linkPage);
            }
      
        }        
    });
}


$(document).on('click', '.link' , function(){

  
var linkPage = $(this).attr('href');  


if ($('body').scrollTop() != 0) {
                $('body').animate({ scrollTop: 0 }, 500, function(){
                    productLoad(linkPage);
                });
            } else { 
                productLoad(linkPage);
            }


console.log('this worked');
return false;

});

// $(document).on('ajaxStop', function() {
//  pageBits();
//  console.log('this is totally working');
// });


$(document).on('DOMNodeInserted', '#page-content', function() {

console.log('this is totally working');
pageBits();

});


// testFunc = function(str, callback) {
//     // Send our params
//     var data = 'some data to send';
//     $.ajax({
//         type: 'POST',
//         url:'http://ntn/',
//         data: data,
//         success: function(data) {

//     $(".lazy").lazyload({ 
//         effect : "fadeIn",
//         failure_limit : 99999,
//         threshold : 0
//     });


//         }
//     });
// }


 // $(".nextandprev.footer").css('top', $('.content').innerHeight() + 305);

