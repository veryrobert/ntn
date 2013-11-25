$(document).ready(function () {


randomStyle();

$('#page-content').hide().show();

setTimeout(function(){

$('#page-content').show();

pageBits();

}, 300);




$(".npfooter").css('top', $('.getHeight').innerHeight() + 68).delay(500).fadeIn();      

    var pathArray = window.location.pathname.split('/');
    var secondLevel = pathArray[1];
    var products = ["chair.php", "glasses.php", "family.php", "watch.php", "lamp.php", "table.php"];
    var collection = 'collection.php';


    $('#pages a[href="'+ secondLevel +'"]').addClass('active');

    if ($.inArray(secondLevel, products) > -1) {
        $('.content, .fullscreen, .nextandprev, .npfooter, #product-content, .close').addClass('active');
        $('body').addClass('overlay');
    }


console.log(pathArray[1]);
console.log(collection);

    if (pathArray[1] == collection) {
       console.log('true');

    $(".close").attr("href", collection);

    } else {
    
    $(".close").attr("href", 'index.php');
    
    }



    // - - - - - - - - - - - - - - - - Doing some cookie stuff below – - - - - - - - - - - - - - //    

    cookieStuff(1);



    if ($("#homepage-flag").length > 0) {
        $.removeCookie('lastclicked');
        $(".close").attr("href", '/');
    }

    // - - - - - - - - - - - - - - - - Next and Previous Button below – - - - - - - - - - - - - - //    



    $(".pages").click(function () {

        var $this = $(this);
        var href = $(this).attr('href');

        if ($this.data('clicked', true)) {
            lastClicked = $.cookie('lastclicked', $this.attr('href'));
            // $("nav#main-nav a[href$='" + href + "']").addClass("active");
            $(".close").attr("href", $.cookie('lastclicked'));
        } 

    });






    $('a.next-button, a.prev-button').click(function(event) {
        event.preventDefault();

        var $el = $('#pages a.active').removeClass('active');
        var $next = $el.parent().next();
        var $prev = $el.parent().prev();
        var fullTop = $('.fullscreen').scrollTop();

        if (fullTop == 0) {

        } else {
           setTimeout(function () {
                $('.fullscreen').scrollTop(0);
                // console.log('yolo');
           }, 300);
        }

        
        if ($(this).hasClass('next-button')) {

            if ($next.length == 0) $next = $('#pages li:first');
            $next.find('a.link').addClass('active');
            _link = $next.find('a.link').attr('href');

        }

        else {

            if ($prev.length == 0) $prev = $('#pages li:last');
            $prev.find('a.link').addClass('active');
            _link = $prev.find('a.link').attr('href');

        }

        $('link.random').remove();

        history.pushState(null, null, _link);

        Loadnext(_link);


    });

    // - - - - - - - - - - - - - - - - Page bits and click function below – - - - - - - - - - - - - - //    




}); // this is the end of document ready





//  Fucntions below here


// variables

var newHash        = '';
    $guts          = $('#guts');
    $content       = $('.content, .collection');
    $fullscreen    = $('.fullscreen');
    $pathName      = $('.link').attr('href');
    $menu          = $('nav#pages a');
    $mainNav       = $('nav#main-nav a');
    $nextandprev   = $('.nextandprev');
    $prev          = $('.prev-button');
    $next          = $('.next-button');
    $link          = $('.link, .pages');
    $pages         = $('.pages');
    $el            = $('#pages a.active').removeClass('active');

//  functions for page loads

   function pageLoad(linkPage) {

$('#page-content').fadeOut(function(){
$(window).trigger('resize');
        
$('link.random').remove();

    history.pushState(null, null, linkPage);
    $("#page-content").load(linkPage + " #guts", function () {

        $('.content, .close, .nextandprev, .npfooter, #product-content').removeClass('active');

            randomStyle();  

        $('#page-content').fadeIn(300, function(){

            pageBits();
        
            $(window).data('plugin_stellar').destroy();
            $(window).data('plugin_stellar').init();
            $(window).trigger('resize');
        

        });
    });
});

}

// Products

function productLoad(linkPage) {

    $('#page-content, .logo, #main-nav').fadeOut(300, function () {
        
        $('link.random').remove();

        $('body').addClass('overlay');
        
        history.pushState(null, null, linkPage);
        
        $("#product-content").load(linkPage + " #guts", function () {

             $('.fullscreen').scrollTop(0);
            
            $('.content, .close, .nextandprev, .npfooter, #product-content').addClass('active').hide();
            
            $fullscreen.addClass('active').hide().fadeIn(function () {

                $('.content, .close, .nextandprev, #product-content').fadeIn(function () {

                    $(".npfooter").css('top', $('.getHeight').innerHeight() + 68).delay(500).fadeIn(); 

                });
            });
        });
    });
}

// Next and Previous

function Loadnext(linkPage) {

    $('.content, .nextandprev, .npfooter, #product-content').fadeOut(function () {


        history.pushState(null, null, linkPage);
        $("#product-content").load(linkPage + " #guts", function () {
            $('.content, .nextandprev, .npfooter, #product-content').addClass('active').fadeIn();
            $(".npfooter").css('top', $('.getHeight').innerHeight() + 68).delay(500).fadeIn();

        });
    });


}


// page requirements

function pageBits() {
    // Lazy load
    $(function () {
        $(".lazy").lazyload({
            effect: "fadeIn",
            effectspeed: 500,
             // skip_invisible : false,
            failure_limit: 15
        });
        $(window).trigger('resize');
    });
    // Parrallax
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0,
        parallaxBackgrounds: false,
        responsive: false
    });
    // Hover for images
    $('.images').hover(function () {
        $(this).find('.imglink').addClass('active');
    }, function () {
        $('.imglink').removeClass('active');
    });

}


function cookieStuff(duration) {

    var date = new Date();
    var minutes = duration;

    date.setTime(date.getTime() + (minutes * 60 * 1000));
    if ($.cookie('test_status') != '1') {
        //show popup here
        $('.welcome-overlay').css('display', 'block'),
        function () {
            $('p').fadeIn();
        };
        $.cookie('test_status', '1', {
            expires: date
        });
    }
    else {
        $('.welcome-overlay').css('display', 'none');
    }
    // $.removeCookie('test_status');

    $('.welcome-overlay a').click(function () {
        $('.welcome-overlay').fadeOut(500);
    });

}



$(document).on('click', '.link, .pages', function(event) {

    var linkPage = $(this).attr('href');

    event.preventDefault();


    if ($(this).hasClass('pages')) {

        // PAGE specific code
        if ($('body').scrollTop() != 0) {
            $('body').animate({
                scrollTop: 0
            }, 500, function () {
            
            pageLoad(linkPage);
            
            });
        }
        else {     
            
            pageLoad(linkPage);

        }

    }

    else {

        // PRODUCT specific code
        if ($('body').scrollTop() != 0) {
            $('body').animate({
                scrollTop: 0
            }, 500, function () {
            productLoad(linkPage);
            });
        }

        else {
            productLoad(linkPage);
        }

    }


});

//  closing ajax elements

$(document).on('click', '.close', function (event) {

event.preventDefault();
$('link.random').remove();

    _link = $('.close').attr('href');

        $fullscreen.fadeOut(function () {
        $fullscreen.removeClass('active');
        $('.content, .close, .nextandprev, .npfooter, #product-content').removeClass('active');
        $('body').removeClass('overlay');

randomStyle();

        history.pushState(null, null, _link);
        $("#page-content").load(_link + " #guts", function () {
            
            $('#main-nav, .logo, #page-content').fadeIn();

            $(function () {
                $(".lazy").lazyload({
                    effect: "fadeIn",
                    effectspeed: 500,
                    failure_limit: 15
                });

                $(window).trigger('resize');
                $(window).data('plugin_stellar').destroy();
                $(window).data('plugin_stellar').init();

            });

        });

    });

});


// $(document).on('click', '.purchasing', function () {

// $('link.random').remove();

//     _link = $('.purchasing').attr('href');

//         $fullscreen.fadeOut(function () {
//         $fullscreen.removeClass('active');
//         $('.content, .close, .nextandprev, .npfooter, #product-content').removeClass('active');
//         $('body').removeClass('overlay');

// randomStyle();

//         history.pushState(null, null, _link);
//         $("#page-content").load(_link + " #guts", function () {
            
//             $('#main-nav, .logo, #page-content').fadeIn();

//             $(function () {
//                 $(".lazy").lazyload({
//                     effect: "fadeIn",
//                     effectspeed: 500,
//                     failure_limit: 15
//                 });

//                 $(window).trigger('resize');
//                 $(window).data('plugin_stellar').destroy();
//                 $(window).data('plugin_stellar').init();

//             });

//         });

//     });

//     return false;
// });




function randomStyle() {

var link = [];
link[0] = "<link rel='stylesheet'  href='/css/img-positions/1.css' type='text/css' media='screen' class='random' />";
link[1] = "<link rel='stylesheet'  href='/css/img-positions/2.css' type='text/css' media='screen' class='random' />";
link[2] = "<link rel='stylesheet'  href='/css/img-positions/3.css' type='text/css' media='screen' class='random' />";
link[3] = "<link rel='stylesheet'  href='/css/img-positions/4.css' type='text/css' media='screen' class='random' />";
link[4] = "<link rel='stylesheet'  href='/css/img-positions/5.css' type='text/css' media='screen' class='random' />";

  if($("body").size()>0){

    var style = link[Math.floor(Math.random() * link.length )];

            if (document.createStyleSheet){
                document.createStyleSheet('style.css');
            }
            else {
                style
                $("head").append($(style));

    }

};


}
 




