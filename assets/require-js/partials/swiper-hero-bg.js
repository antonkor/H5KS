define(['jquery', 'swiper'], function($) {

  // BG and Hero sliders
  var bgSwiper = new Swiper('#bg_swiper', {
    loop: true,
    //slideClass: 'bg-item'
    effect: 'fade',
  });
  var heroSwiper = new Swiper('#hero_swiper', {
    pagination: '#hero_swiper .swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true,
    loop: true,
    autoplay: 4000
  });
  heroSwiper.on('onTouchEnd', function() {
    heroSwiper.stopAutoplay();
  });
  heroSwiper.on('onAutoplayStop', function() {
    setTimeout(function() {
      heroSwiper.startAutoplay();
    }, 8000);
  });


  heroSwiper.on('onTransitionEnd', function() {
    heroSwiper.fixLoop();
  });
  bgSwiper.params.control = heroSwiper;
  heroSwiper.params.control = bgSwiper;



});