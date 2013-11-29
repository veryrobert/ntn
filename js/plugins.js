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
    $close         = $('.close');
    $overlay       = $('.content, .close, .nextandprev, .npfooter, #product-content');
    $el            = $('#pages a.active').removeClass('active');


    var pathArray   = window.location.pathname.split('/');
    var secondLevel = pathArray[1];
    var products    = ["chair.php", "glasses.php", "family.php", "watch.php", "lamp.php", "table.php"];
    var productPage = $('.content, .nextandprev, .npfooter, #product-content');
    var overlayPage = $('.content, .fullscreen, .nextandprev, .npfooter, #product-content, .close');
    var collection  = 'collection.php';

    var pageContent = '#page-content'; 
    var mobileStyle = '<link rel="stylesheet" href="/css/img-positions/mobile.css" type="text/css" />'; 

function checkDevice(){
    return (
        (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
        (navigator.userAgent.toLowerCase().indexOf("iphone") > -1)
    );

}


$(document).ready(function () {

// Draws Logos
$(function () { 
  var paper = new Raphael(document.getElementById('logo'), 57, 21);
  var rect = paper.rect(0, 0, 56, 18).attr({'stroke-width': 1}).translate(0.5, 0.5);
  var line = paper.path("M 28, 0 l 0, 18").attr({'stroke-width': 1}).translate(0.6, 0);
  var slash = paper.path("M 0, 0 l 18, 18").attr({'stroke-width': 1}).translate(0.5, 0.5);
  var slash2 = paper.path("M 38, 0 l 18, 18").attr({'stroke-width': 1}).translate(0.5, 0.5);
});

    var nav = new Raphael(document.getElementById('nav-button'), 30, 30);

    for(var i = 0; i <= 2; i++) {
        nav.path("M 0, 2 l 24, 0").attr({'stroke-width': 1}).translate(0, i*8);
        // paper.circle(250 + (2*multiplier), 100 + multiplier, 50 - multiplier) ;
        console.log(i * 10) 
    } 



if(checkDevice() === true)

{

$('.wrapper').hide();
$('head').append(mobileStyle);
// handheld shit going on here
$('link.mainStyle').remove();


    setTimeout(function(){
       $('.wrapper').fadeIn();
        $(window).trigger('resize');
    }, 300);



$(".lazy").lazyload().show();
$('#main-nav').hide();

$('.nav-button').click(function(e){
    if( $('#main-nav').is(':hidden') ) {
        $('#main-nav').slideDown('slow', function(){
            $('ul.menu').animate({opacity: 1}, 300);
        });
    }
    else {
        $('ul.menu').animate({opacity: 0}, 300, function(){
            $('#main-nav').slideUp('slow');
        });
    }

});


  } else {
    //  We're all over that desktop

    randomStyle();

    $(pageContent).hide().show();
    setTimeout(function(){
        $(pageContent).show();
         pageBits();
    }, 300);


}



$(".npfooter").css('top', $('.getHeight').innerHeight() + 68).hide().fadeIn();  
 
$('#pages a[href="'+ secondLevel +'"]').addClass('active');

if ($.inArray(secondLevel, products) > -1) {
    $(overlayPage).addClass('active');
    $('body').addClass('overlay');
}

// Close button Stuff
cookieStuff(600);
pagesCookie();


if (pathArray[1] == collection) {
     $(".close").attr("href", collection);
     $('body').addClass('collection');
} else {
    $(".close").attr("href", 'index.php');
    $('body').addClass('home');
}   

if ($("#homepage-flag").length > 0) 
{
    $.removeCookie('lastclicked');
    $(".close").attr("href", '/');
}


});



$(document).on('click', '.closeOverlay, .pages, .link, .next-button, .prev-button ', function(event) {

var $next       = $el.parent().next();
var $prev       = $el.parent().prev();
var fullTop     = $('.fullscreen').scrollTop();
var productPage = '.content, .nextandprev, .npfooter, #product-content';
var overlay    = $('.content, .close, .nextandprev, .npfooter, #product-content');
var collection = "collection.php";
var linkPage   = $(this).attr('href');


checkDevice()

if(checkDevice() === true) {

} else {

        event.preventDefault();

        $('#pages a[href="' + linkPage + '"]').addClass('active');

        if (collection == linkPage) {
            $('body').addClass('collection');
            $('body').removeClass('home');
        } else {
            $('body').removeClass('collection');
            $('body').addClass('home');
        }

        if ($(this).hasClass('link')) {

            if ($('body').scrollTop() !== 0) {
                $('body').animate({
                    scrollTop: 0
                }, 500, function() {
                    productLoad(linkPage);
                });
            } else {
                productLoad(linkPage);
            }    

        } else if ($(this).hasClass('pages')) {

            if ($('body').scrollTop() !== 0) {
                $('body').animate({
                    scrollTop: 0
                }, 500, function() {
                    pageLoad(linkPage);
                });
            } else {
                pageLoad(linkPage);
            }


        } else if ($(this).hasClass('closeOverlay')) {

            $('link.random').remove();

            $fullscreen.fadeOut(function () {
                $fullscreen.removeClass('active');
                $(overlay).removeClass('active');
                $('body').removeClass('overlay');

                randomStyle();

                history.pushState(null, null, linkPage);

                $("#page-content").load(linkPage + " #guts", function () {

                    $('#main-nav, .logo, #page-content').fadeIn();
                  
                    pageBits();
                    killBits();

                });

            });

        } else if ($(this).hasClass('next-button')) {

                if ($next.length == 0) $next = $('#pages li:first');
                $next.find('a.link').addClass('active');
                _link = $next.find('a.link').attr('href');

                $(productPage).fadeOut(function(){
                    Loadnext(_link);
                });

        } else if ($(this).hasClass('prev-button')) {

                if ($prev.length == 0) $prev = $('#pages li:first');
                $prev.find('a.link').addClass('active');
                _link = $prev.find('a.link').attr('href');

                $(productPage).fadeOut(function(){
                    Loadnext(_link);
                });  
        }

 }


});




function Loadnext(linkPage) {
    var productPage = '.content, .nextandprev, .npfooter, #product-content'; 
    history.pushState(null, null, _link);
    $('.content').html('');
    $("#product-content").load(linkPage + " #product-guts", function(){
        $(productPage).addClass('active').hide().fadeIn();
        $(".npfooter").css('top', $('.getHeight').innerHeight() + 68).hide().fadeIn();       
    });
}


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
                killBits();
            });
        });
    });
}


function productLoad(linkPage) {
    $('#page-content, .logo, #main-nav').fadeOut(300, function () {
        $('link.random').remove();
        $('body').addClass('overlay');
        history.pushState(null, null, linkPage);
        $("#product-content").load(linkPage + " #product-guts", function () {
            $('.fullscreen').scrollTop(0);
            $('.content, .close, .nextandprev, .npfooter, #product-content').addClass('active').hide();
            $fullscreen.addClass('active').hide().fadeIn(function () {
                $('.content, .close, .nextandprev, #product-content').fadeIn();
                $(".npfooter").css('top', $('.getHeight').innerHeight() + 68).hide().fadeIn();  
            });
        });
    });
}


function pageBits() {
    $(function () {
        $(".lazy").lazyload({
            effect: "fadeIn",
            effectspeed: 500,
            failure_limit: 15
        });
        $(window).trigger('resize');
    });

    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 0,
        parallaxBackgrounds: false,
        responsive: false
    });

    $('.images').hover(function () {
        $(this).find('.imglink').addClass('active');
    }, function () {
        $('.imglink').removeClass('active');
    });

}



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
                    $("head").append($(style));
        }

    };
} 


function cookieStuff(duration) {
    var date = new Date();
    var minutes = duration;
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    if ($.cookie('test_status') != '1') {
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
    $('.welcome-overlay a').click(function () {
        $('.welcome-overlay').fadeOut(500);
    });
}

function pagesCookie() {

$(".pages").click(function () {
    var $this = $(this);
    var href = $(this).attr('href');
    if ($this.data('clicked', true)) {
        lastClicked = $.cookie('lastclicked', $this.attr('href'));
        $(".close").attr("href", $.cookie('lastclicked'));
    } 
});

}

function killBits() {
    $(window).data('plugin_stellar').destroy();
    $(window).data('plugin_stellar').init();
    $(window).trigger('resize');
}







