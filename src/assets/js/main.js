(function($) {
    // responsive helpers
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

    var Page = {
        // All pages
        'common': {
            init: function() {

                // Animate Page Header
                var pageHeader = document.getElementById('page-header');
                var headroom = new Headroom(pageHeader, {
                    //"offset": is_mobile ? 0 : 205,
                    'offset': 0,
                    "tolerance": 5,
                    onTop : function() {
                       
                    },

                    onNotTop : function() {
                        
                    },
                });
                headroom.init();

                // Anchor link smooth page scrolling
                smoothScroll.init();

            },
            finalize: function() {
                // Autogrow textareas
                $('.autogrow-textarea').autogrow();

                // Move modals to bottom to fix z-index issues
                $('.modal').appendTo("body");

                // vertically center modals
                function setModalMaxHeight(element) {
                    this.$element = $(element);
                    this.$content = this.$element.find('.modal-content');
                    var borderWidth = this.$content.outerHeight() - this.$content.innerHeight();
                    var dialogMargin = $(window).width() < 768 ? 20 : 60;
                    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
                    var headerHeight = this.$element.find('.modal-header').outerHeight() || 0;
                    var footerHeight = this.$element.find('.modal-footer').outerHeight() || 0;
                    var maxHeight = contentHeight - (headerHeight + footerHeight);

                    this.$content.css({
                        'overflow': 'hidden'
                    });

                    this.$element
                        .find('.modal-body').css({
                            'max-height': maxHeight,
                            'overflow-y': 'auto'
                        });
                }
                $('.modal').on('show.bs.modal', function() {
                    $(this).show();
                    setModalMaxHeight(this);
                });
                $(window).resize(function() {
                    if ($('.modal.in').length !== 0) {
                        setModalMaxHeight($('.modal.in'));
                    }
                });

                // Keep modal-open if another modal is called
                /*
                $(document).on('hidden.bs.modal', '.modal', function () {
                    $('.modal:visible').length && $(document.body).addClass('modal-open');
                });
                */

                // autoplay youtube videos on modal open and stop them on modal close
                $('.video-modal').each(function() {
                    var $video = $(this).find('iframe');
                    var url = $video.attr('src') + '&autoplay=1';

                    $video.attr('src', '');

                    $(this).on('shown.bs.modal', function() {
                        $video.attr('src', url);
                    });
                    $(this).on('hide.bs.modal', function() {
                        $video.attr('src', '');
                    });
                });

                // open/ close hamburger menu
                $('.navbar-toggle').click(function() {
                    $('body').toggleClass('modal-open menu-open');
                    $('.hamburger-icon').toggleClass('active');
                });


                // Change dropdown text
                $(".dropdown-replace-selected-label .dropdown-label").click(function() {
                    $(this).parents('.dropdown').find('.dropdown-selected-label').text($(this).text());
                    $(this).parents('.dropdown').find('.dropdown-selected-label').val($(this).text());
                });

            }
        },
        // note the change from dashes to underscores.
        'page_template_page_home': {
            init: function() {
                // JavaScript to be fired on the hompe page
                
            }
        },

    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = Page;
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

})(jQuery);



// Fire every second of resizing browser window
jQuery(window).on("throttledresize", function(event) {

});
// Fire after 2 seconds of resizing browser window
jQuery(window).on("debouncedresize", function(event) {
 
});

// Reload page after each major breakpoint
// use only if responsive JS is needed
/*
enquire.register("screen and (max-width: 767px)", {
    unmatch: function() {
        reloadPage();
    }
});
enquire.register("screen and (min-width: 768px) and (max-width: 991px)", {
    unmatch: function() {
        reloadPage();
    }
});
enquire.register("screen and (min-width: 992px) and (max-width: 1199px)", {
    unmatch: function() {
        reloadPage();
    }
});
enquire.register("screen and (min-width: 1200px)", {
    unmatch: function() {
        reloadPage();
    }
});

function reloadPage() {
    location.reload(false);
}
*/