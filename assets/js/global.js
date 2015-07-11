$(document).ready(function() {

  pushBody(false);

  //$('.page-header').headroom();
  $(".page-header").headroom({
    "tolerance": 5,
    "offset": 205,
  });

  // Move modals to bottom 
  $('.modal').appendTo("body");

  // Keep modal-open if another modal is called
  $(document).on('hidden.bs.modal', '.modal', function () {
    $('.modal:visible').length && $(document.body).addClass('modal-open');
  });


  /*
  if ($(window).width() >= 768) {
    // Skrollr initiation
    var s = skrollr.init();
  }
  */


  // Scroll initially if there's a hash in the url 
  $.localScroll.hash({
    target: '#content', // Could be a selector or a jQuery object too.
    queue:true,
    duration:1500,
    offset: {top: -(parseInt($('body').css('paddingTop'), 10))},
  });
  

  // Scroll every hash link
  $.localScroll({
    queue:true,
    duration:1000,
    hash:false, // todo: make true and fix the initial "jump" when a hash link is clicked
    offset: {top: -(parseInt($('body').css('paddingTop'), 10))},
    onBefore:function( e, anchor, $target ){
      // The 'this' is the settings object, can be modified
    },
    onAfter:function( anchor, settings ){
      // The 'this' contains the scrolled element (#content)
    }
  });






});
$(window).on("throttledresize", function( event ) {
  pushBody(false);
});



// Header magic
function pushBody(includeSubHeader) {
  var topNavHeight = $('.navbar-fixed-top').height();

  if(includeSubHeader === undefined) {
    topNavHeight += $('.sub-header').height();
  }

  $('body').css({paddingTop: topNavHeight});
}


function responsiveHelpers() {
  var is_mobile = false,
      is_tablet = false,
      is_desktop = false,
      not_mobile = false,
      not_tablet = false,
      not_desktop = false;

  if ($(window).width() <= 767) {
    is_mobile = true;
  } else {
    not_mobile = true;
  }
  if ($(window).width() >= 768 && $(window).width() <= 991) {
    is_tablet = true;
  } else {
    not_tablet = true;
  }
  if ($(window).width() >= 992) {
    is_desktop = true;
  } else {
    not_desktop = true;
  }
}
