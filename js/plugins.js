// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


$(function() {
  $("img.lazy").lazyload({
    effect : "fadeIn",
    effectspeed : 900
  });
});


// Below is the love I have for Sean "Code Like a M*ther F*cking Boss" Mongey

$.stellar({
  horizontalScrolling: false,
  verticalOffset: 0,
  responsive: true
});

// Loads of love


// Hover for images

  $('.images').hover(function(){
    $(this).find('.imglink').addClass('active');
      },
    function(){
      console.log('hovered out');   
       $('.imglink').removeClass('active');
    });
