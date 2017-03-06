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

        $(".page-header").headroom({
          "tolerance": 5,
          //"offset": 205,
        });

        
        // Scroll initially if there's a hash in the url 
        // add velocity scrollTo if needed
        

        
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired

        // Move modals to bottom 
        $('.modal').appendTo("body");

        // Keep modal-open if another modal is called
        $(document).on('hidden.bs.modal', '.modal', function () {
          $('.modal:visible').length && $(document.body).addClass('modal-open');
        });

        // Scroll every hash link
        // add velocity scrollTo if needed

        // open/ close hamburger menu
        $('.navbar-toggle').click(function() {
          $('body').toggleClass('modal-open menu-open');
          $('.hamburger-icon').toggleClass('active');
        });

        // autogrow textareas
        autosize($('textarea'));
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



// Fire every second of resizing browser window
$(window).on("throttledresize", function( event ) {
  
});
// Fire after 2 seconds of resizing browser window
$(window).on("debouncedresize", function( event ) {
  pushBody();
});

// Reload page after each major breakpoint
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
enquire.register("screen and (min-width: 992px) and (max-width: 1199px)", {
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
