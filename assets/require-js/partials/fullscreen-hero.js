require(['jquery', 'velocity', 'window_resize_plugins'], function($) {

  setup_hero();

  // Fire after 2 seconds of resizing browser window
  $(window).on("debouncedresize", function( event ) {
    //setup_hero(); // this functionality messes with touch devices for some reason
  });


});

function setup_hero() {
  var topNavHeight = $(window).width() <= 991 ? $('.fixed-header').outerHeight() : 0;


  $('#fullscreen_hero')
    .outerHeight($(window).height() - topNavHeight)
    .find('.hero-wrap').velocity({ opacity: 1 }, { duration: 750, delay: 250, complete: function() {
      $('.hero-bottom').velocity({ opacity: 1, translateY: [ 0, 500 ] }, { duration: 750 });
      $('.page-body').velocity({ opacity: 1}, { duration: 750, delay: 500 });
      $('.page-footer').velocity({ opacity: 1}, { duration: 750, delay: 500 });
    }});
    

  if ($(window).width() <= 991) {
    $('body').css({paddingTop: topNavHeight});
  }

}