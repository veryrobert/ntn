$(document).ready(function() {
    $(function() {
        // Sets Varibles 
        var newHash = "",
            $mainContent = $("#main-content"),
            $content = $(".content"),
            $guts = $("#guts"),
            $fullscreen = $(".fullscreen"),
            $pathName = $('.link').attr('href'),
            $menu = $('nav a'),
            $el;
        var linkage = function() {
                $('.container, .logo').fadeOut();
                $fullscreen.addClass('active');
                $('body').addClass('overlay');
                $('.nextandprev').delay(900).fadeIn(200);
                $mainContent.fadeIn(1000);
                $('.close').addClass('active');
                _link = $(".link").attr("href");
                history.pushState(null, null, _link);
                loadContent(_link);
            }
        $(".link").click(function(e) {
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
        $(".nextandprev").children().click(function() {
            var fullTop = $('.fullscreen').scrollTop();
            if (fullTop == 0) {
                console.log("you at the top yo!");
            } else {
                setTimeout(function() {
                    $('.fullscreen').scrollTop(0);
                }, 300);
            }
            return false;
        });
        $('.next-button').click(function(e) {
            e.preventDefault();
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
        $('.prev-button').click(function(e) {
            e.preventDefault();
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
        $('.close').click(function() {
            var position = $('.link').data("scrollDown");
            $(document).scrollTop(position);
            // $('.fullscreen').fadeOut();
            $('.fullscreen').removeClass('active');
            $('#guts').html('');
            $('.content').removeClass('active');
            $('body').removeClass('overlay');
            $('.close').removeClass('active');
            $('.nextandprev').removeClass('active');
            $('.nextandprev').fadeOut(30);
            $('.container, .logo').fadeIn();
            history.pushState({}, null, '/');
            return false;
        });

        function loadContent(href) {
            $mainContent.find("#guts", function() {}).fadeOut(200, function() {
                $mainContent.hide().load(href + " #guts", function() {
                    $mainContent.fadeIn(500, function() {
                        $(".nextandprev.footer").css('top', $('.content').innerHeight() + 65);
                        $('.content').addClass('active');
                        $('.nextandprev').addClass('active');
                        $('.close').addClass('active');
                    });
                    $("nav a").removeClass("active");
                    $('.nextandprev').removeClass('active');
                    $('.close').removeClass('active');
                    $("nav a[href$='" + href + "']").addClass("active");
                });
            });
        }
        $(window).bind('popstate', function() {
            _link = location.pathname.replace(/^.*[\\\/]/, '');
            loadContent(_link);
        });
    });
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
    var fixHeight = function() {
            console.log($('.content').innerHeight());
        }
});