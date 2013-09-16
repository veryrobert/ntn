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

// Place any jQuery/helper plugins in here.



var posLeft = [ '100','200','300','600','700','800']
var posTop = [ '100','200','300','400','500','600','700' ]

$(document).ready(function(){


$('.images').each(function(i,el){

  var imgTop = posTop[Math.floor(Math.random()*posTop.length)]
  var imgLeft = posLeft[Math.floor(Math.random()*posLeft.length)]
  
  $(el).css({left: imgLeft + "px", top: imgTop + "px"});
  
});

$(function() {
    $( ".images" ).draggable();
  });



});