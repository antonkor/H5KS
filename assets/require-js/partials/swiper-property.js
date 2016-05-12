define(['jquery', 'swiper'], function($) { 
  // Property slider
  var propertySwiper = new Swiper('#property_swiper', {
    pagination: '#property_swiper .swiper-pagination',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 30,
    keyboardControl: true,
    prevButton: $('#pager_nav_prev'),
    nextButton: $('#pager_nav_next'),
    loop: true,
    onInit: changePropertyInfos
  });
  propertySwiper.on('onTouchEnd', function() {
    propertySwiper.stopAutoplay();
  });
  propertySwiper.on('onAutoplayStop', function() {
    setTimeout(function() {
      propertySwiper.startAutoplay();
    }, 4000);
  });
  propertySwiper.on('onTransitionEnd', function() {
    propertySwiper.fixLoop(); 

    prevSlideURL = $('#property_swiper .swiper-slide-prev').find('.img-sm').attr('src');
    nextSlideURL = $('#property_swiper .swiper-slide-next').find('.img-sm').attr('src');

    $('#pager_nav_prev').append('<div class="img-bg animated fadeIn" style="background-image: url('+ prevSlideURL +');"></div>');
    $('#pager_nav_next').append('<div class="img-bg animated fadeIn" style="background-image: url('+ nextSlideURL +');"></div>');

    $('#pager_nav_prev .img-bg').not(':last-child').not(':nth-last-child(2)').remove();
    $('#pager_nav_next .img-bg').not(':last-child').not(':nth-last-child(2)').remove();

    changePropertyInfos();
  });
  function changePropertyInfos() {
    activeProperty = $('#property_swiper .swiper-slide-active'),
    propURL = activeProperty.attr('href'),
    propTitle = activeProperty.find('.slide-greater').text(),
    propLesser = activeProperty.find('.slide-lesser').text(),

    $('.swiper-pager .info-wrap').attr('href', propURL);
    $('.swiper-pager .info-wrap .h3').text(propTitle);
    $('.swiper-pager .info-wrap .text-muted').text(propLesser);
  }
});