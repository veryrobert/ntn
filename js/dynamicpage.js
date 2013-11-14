

$(document).ready(function() {

    var date = new Date();
    var minutes = 1;

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
    


    $(function() {
        // Sets Varibles 
        var newHash = '',
            $mainContent = $('#main-content'),
            $guts        = $('#guts'),
            $content     = $('.content'),
            $fullscreen  = $('.fullscreen'),
            $pathName    = $('.link').attr('href'),
            $menu        = $('nav#pages a'),
            $mainNav     = $('nav#main-nav a'),
            $nextandprev = $('.nextandprev'),
            $prev        = $('.prev-button'),
            $next        = $('.next-button'),
            $link       = $('.link'),
            $pages       = $('.pages'),
            $el;



        var linkage = function() {
                $('.container, .collection, .logo, #main-nav').fadeOut(300, function(){

                    setTimeout(function(){
                        
                        $fullscreen.addClass('active');
                        $('body').addClass('overlay');
                        _link = $(".link").attr("href");
                        history.pushState(null, null, _link);
                        loadContent(_link);

                    },100);

                });
            }



                            $(".close").attr("href", '/');
                            if ($("#homepage-flag").length > 0) {
                                $.removeCookie('lastclicked');
                                $(".close").attr("href", '/');
                            }
                            $('.pages').click(function() {
                                lastClicked = $.cookie('lastclicked', $('a.pages').attr('href'));
                            });
                            $(".close").attr("href", $.cookie('lastclicked'));


        var closeOver = function() {
                $fullscreen.removeClass('active');
            }


   $('.close').click(function() {
       closeOver(function(){

                    setTimeout(function(){
                       
$('body').css('background','aqua');

                    }, 500);
  

       });


    });


    


        $link.click(function(e) {
            e.preventDefault();
            var bodyTop = $('body').scrollTop();
            if (bodyTop == 0) {
                linkage();
            } else {
                $("html, body").animate({
                    scrollTop: 0
                }, 1000, function() {
                   linkage();
                });
            }
            return false;
        });


        $nextandprev.children().click(function() {
            var fullTop = $('.fullscreen').scrollTop();
            if (fullTop == 0) {
            } else {
                setTimeout(function() {
                    $('.fullscreen').scrollTop(0);
                }, 300);
            }
            return false;
        });


        $next.click(function() {
            var $el = $('#pages a.active').removeClass('active');
            var $next = $el.parent().next();
            if ($next.length == 0) $next = $('#pages li:first');
            _link = $next.find('a.link').attr('href');
            history.pushState(null, null, _link);
            loadContent(_link);
            $('.nextandprev').animate({
                opacity: 0
            }, 300).delay(500).animate({
                opacity: 1
            }, 300);
            return false;
        });
        
        $prev.click(function() {
            var $el = $('#pages a.active').removeClass('active');
            var $prev = $el.parent().prev();
            if ($prev.length == 0) $prev = $('#pages li:last');
            _link = $prev.find('a.link').attr('href');
            history.pushState(null, null, _link);
            $('.nextandprev').animate({
                opacity: 0
            }, 300).delay(500).animate({
                opacity: 1
            }, 300);
            loadContent(_link);
            return false;
        });
 



      function loadContent(href) {
            $mainContent.find("#guts", function() {}).fadeOut(200, function() {
                $mainContent.fadeOut().load(href + " #guts", function() {
                    setTimeout(function() {
                        $mainContent.fadeIn(300, function() {
                            $(".nextandprev.footer").css('top', $('.content').innerHeight() + 305);
                            $('.content').addClass('active');
                            $('.close').addClass('active');
                            $('.nextandprev').addClass('active');
                        });

                    }, 500);
                    $("nav#pages a").removeClass("active");
                    $('.nextandprev').removeClass('active');
                    $('.close').removeClass('active');
                    $("nav#pages a[href$='" + href + "']").addClass("active");
                });
            });
        }
        $(window).bind('popstate', function() {
            _link = location.pathname.replace(/^.*[\\\/]/, '');
            loadContent(_link);
        });

    });
    



// $('body').css('background','aqua', function(){






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

   
});







