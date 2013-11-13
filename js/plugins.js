$(document).ready(function() {

// Set Variables

    var date    = new Date();
    var minutes = 1;


// Plugins Elements

$(function() {
    $('.lazy').lazyload({
        effect: 'fadeIn',
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


// Reusable Functions

// Main Ajax Stuff

  $(function() {
        // Sets Varibles 
        var newHash = '',
            $mainContent = $('#main-content'),
            $content     = $('.content'),
            $guts        = $('#guts'),
            $fullscreen  = $('.fullscreen'),
            $pathName    = $('.link').attr('href'),
            $menu        = $('nav#pages a'),
            $nextandprev = $('.nextandprev'),
            $mainNav     = $('nav#main-nav a'),
            $el;


}):






});







