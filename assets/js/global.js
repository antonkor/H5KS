$(document).ready(function() {






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
