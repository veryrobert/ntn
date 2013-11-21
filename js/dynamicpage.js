$(document).ready(function () {




$(".npfooter").css('top', $('.content').innerHeight() + 68).delay(500).fadeIn();      


    var pathArray = window.location.pathname.split('/');
    var secondLevel = pathArray[1];
    var products = ["chair.php", "glasses.php", "family.php", "watch.php", "light.php", "table.php"];

    console.log(secondLevel);
    console.log(products);

    if ($.inArray(secondLevel, products) > -1) {

        $('.content, .fullscreen, .nextandprev, .npfooter, #product-content, .close').addClass('active');

    }
    else {

    }



    // - - - - - - - - - - - - - - - - Doing some cookie stuff below – - - - - - - - - - - - - - //    

    cookieStuff(1);

    $(".close").attr("href", 'index.php');

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



    $('a.next-button, a.prev-button').click(function (e) {
        e.preventDefault();

        var $el = $('#pages a.active').removeClass('active');
        var $next = $el.parent().next();
        var $prev = $el.parent().prev();
        var fullTop = $('.fullscreen').scrollTop();

        if (fullTop == 0) {

        } else {
           setTimeout(function () {
                $('.fullscreen').scrollTop(0);
                console.log('yolo');
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


        history.pushState(null, null, _link);

        Loadnext(_link);



    });





    // - - - - - - - - - - - - - - - - Page bits and click function below – - - - - - - - - - - - - - //    


$('#page-content').hide().fadeIn('fast');

    pageBits();

});


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

    history.pushState(null, null, linkPage);
    $("#page-content").load(linkPage + " #guts", function () {
        // $('.collection').addClass('active');
        $('.content, .close, .nextandprev, .npfooter, #product-content').removeClass('active');

        $('#page-content').fadeIn(300, function(){

            pageBits();

        });

    });

});

}

// Products

function productLoad(linkPage) {
    $('#page-content, .logo, #main-nav').fadeOut(300, function () {
        
        $('body').addClass('overlay');
        
        history.pushState(null, null, linkPage);
        
        $("#product-content").load(linkPage + " #guts", function () {
            
            $('.content, .close, .nextandprev, .npfooter, #product-content').addClass('active').hide();
            
            $fullscreen.addClass('active').hide().fadeIn(function () {

                $('.content, .close, .nextandprev, #product-content').fadeIn(function () {

                    $(".npfooter").css('top', $('.content').innerHeight() + 68).delay(500).fadeIn();                                     
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
            failure_limit: 15
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



$(document).on('click', '.link, .pages', function () {

    var linkPage = $(this).attr('href');

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

    return false;

});


// $(document).on('DOMNodeInserted', '#page-content', function () {
//     pageBits();
// });

//  closing ajax elements

$(document).on('click', '.close', function () {

    _link = $('.close').attr('href');

        $fullscreen.fadeOut(function () {
        $fullscreen.removeClass('active');
        $('.content, .close, .nextandprev, .npfooter, #product-content').removeClass('active');
        $('body').removeClass('overlay');

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
            });


        });

    });
    return false;
});




