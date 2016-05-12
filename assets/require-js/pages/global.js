define([
  'headroom', 
  'headroom_jquery', 
  'window_resize_plugins', 
  'bootstrap',
  ], function() {

    $(document).ready(function() {

      // page header helper classes
      $('.page-header').headroom({
        'tolerance': 5,
        'offset': 400,
        onTop : function() {
          console.log('ontop')
          if($(window).width() >= 992) {
            $('.page-header').removeClass('nav-active');
            $('body').removeClass('menu-open');
          }
        },
        onNotTop : function() {
          if($(window).width() >= 992) {
            $('.page-header').addClass('nav-active');
            $('body').addClass('menu-open');
          }
        }
      });


      // open/ close hamburger menu
      $('.navbar-toggle').click(function(e) {
        $('.page-header').toggleClass('nav-active');
        $('body').toggleClass('menu-open');

        // if tablet or mobile
        if($(window).width() <= 991) {
          $('#navbar_collapse').collapse('toggle');
          $('body').toggleClass('modal-open');
        } 
      });


    


      // Move modals to bottom 
      $('.modal').appendTo("body");
      // Keep modal-open if another modal is called
      $(document).on('hidden.bs.modal', '.modal', function () {
        $('.modal:visible').length && $(document.body).addClass('modal-open');
      });

    });


    // Fire every second of resizing browser window
    $(window).on("throttledresize", function( event ) {
      
    });
    // Fire after 2 seconds of resizing browser window
    $(window).on("debouncedresize", function( event ) {
      
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




});