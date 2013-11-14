$(document).ready(function() {

    
    cookieStuff(10);

    $(".close").attr("href", '/');

    if ($("#homepage-flag").length > 0) {
        $.removeCookie('lastclicked');
        $(".close").attr("href", '/');
    }
    $('.pages').click(function() {
        lastClicked = $.cookie('lastclicked', $('a.pages').attr('href'));
    });
    $(".close").attr("href", $.cookie('lastclicked'));


    $('a.next-button, a.prev-button').click(function(){
        var fullTop = $('.fullscreen').scrollTop();
        if (fullTop == 0) {
        } else {
            setTimeout(function() {
                $('.fullscreen').scrollTop(0);
            }, 300);
        }
        

        if ( $(this).hasClass('next-button') ) {
            var $next = $el.parent().next();
            if ($next.length == 0) $next = $('#pages li:first');
            _link = $next.find('a.link').attr('href');
            
        } else {
            var $prev = $el.parent().prev();
            if ($prev.length == 0) $prev = $('#pages li:last');
            _link = $prev.find('a.link').attr('href');
        }

        history.pushState(null, null, _link);
        $('.nextandprev').animate({
            opacity: 0
        }, 300).delay(500).animate({
            opacity: 1
        }, 300);
        loadContent(_link);
        return false;
    });

    $('#page-content').hide().fadeIn('fast');

    //_link = location.pathname.replace(/^.*[\\\/]/, '');
    // loadContent(_link);


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
        console.log(linkPage);
        //$('#page-content').fadeOut('fast');

        history.pushState(null, null, linkPage);
        $("#page-content").load(linkPage + " #guts", function(){
             pageBits(); 
            $('.collection').addClass('active');
            $('.content, .close, .nextandprev, #product-content').removeClass('active');
             
            
           
        });

}

function productLoad(linkPage) {
        console.log('productLoad');
        $fullscreen.addClass('active');
        $('body').addClass('overlay');    
        console.log('whoop!');
        history.pushState(null, null, linkPage);
        $("#product-content").load(linkPage + " #guts", function(){
            pageBits();
            $('.collection').removeClass('active');
            $('.content, .close, .nextandprev, #product-content').addClass('active');
            $(".nextandprev.footer").css('top', $('.content').innerHeight() + 305);
            $("nav#pages a").removeClass("active");
            $("nav#pages a[href$='" + linkPage + "']").addClass("active");  
            $('.fullscreen').addClass('show');
            $('#product-content').fadeIn('fast');
            $('.content').fadeIn('fast');
            

        });
}


// page requirements

function pageBits() {
    // Lazy load
    $(function() {
        $(".lazy").lazyload({
            effect: "fadeIn",
            effectspeed: 900,
            failure_limit: 15
        });
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


    $link.click(function(e) {
        e.preventDefault();
        var linkPage = $(this).attr('href');

        if ($(this).hasClass('pages')){

            // PAGE specific code
            if ($('body').scrollTop() != 0) {
                $('body').animate({ scrollTop: 0 }, 500, function(){
                    pageLoad(linkPage);
                });
            } else { pageLoad(linkPage); }
            console.log('page');

        } else {

            // PRODUCT specific code
            if ($('body').scrollTop() != 0) {
                $('body').animate({ scrollTop: 0 }, 500, function(){
                    productLoad(linkPage);
                });
            } else { 
                productLoad(linkPage);
            }
            console.log('product');
        }        
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


