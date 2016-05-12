define(['jquery', 'velocity'], function($, Velocity) {

  // hero input stuff
  $('.hero-search input.animate-placeholder').focus(function() {
    //heroSwiper.stopAutoplay(); // the onTouchEnd overrides this

    $(this).one('keypress', function() {
      $('.hero-search .input-placeholder').velocity({
        opacity: 0,
        translateX: '30px'
      }, 200);
    });
    
  });;
  $('.hero-search input.animate-placeholder').blur(function() {
    //heroSwiper.startAutoplay(); // the onTouchEnd overrides this

    if(!$(this).val()) {
      $('.hero-search .input-placeholder').velocity({
        opacity: 1,
        translateX: '0'
      });
    }
  });



});