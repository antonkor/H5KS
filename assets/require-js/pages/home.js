require(['jquery'], function() {

  require(['partials/fullscreen-hero'], function() {

    if($("html").hasClass('no-touch')) {
      require(['partials/skrollr']);
    }
    
  });


  require(['partials/swiper-hero-bg']);
  require(['partials/search-basic']);

  require(['partials/swiper-property']);

  




});