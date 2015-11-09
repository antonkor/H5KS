/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        pushBody();

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
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.


$(window).on("debouncedresize", function( event ) {
  pushBody();
});

enquire.register("screen and (max-width: 767px)", {
  unmatch : function() {
    reloadPage();
  }
});
enquire.register("screen and (min-width: 768px) and (max-width: 991px)", {
  unmatch : function() {
    reloadPage();
  }
});
enquire.register("screen and (min-width: 992px)", {
  unmatch : function() {
    reloadPage();
  }
});
enquire.register("screen and (min-width: 1200px)", {
  unmatch : function() {
    reloadPage();
  }
});
function reloadPage() {
  location.reload(false);
}



// Header magic for fixed headers
function pushBody(includeSubHeader) {
  var topNavHeight = $('.fixed-header').outerHeight();

  if(includeSubHeader === undefined) {
    topNavHeight += $('.sub-header').outerHeight();
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
