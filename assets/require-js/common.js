// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
require.config({
    baseUrl: 'assets/js',
    paths: {
      jquery: [
        '//ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min',
        'lib/jquery-2.2.3.min'
      ],
      bootstrap: 'lib/bootstrap',
      velocity: 'lib/velocity.min',
      headroom: 'plugins/headroom.min',
      headroom_jquery: 'plugins/headroom.jquery.min',
      swiper: 'plugins/swiper.min',
      window_resize_plugins: 'plugins/window-resize.min',
      skrollr: 'plugins/skrollr.min', 
      //waypoints: 'plugins/jquery.waypoints.min'

    },
    shim: {
      bootstrap: {
        deps: ['jquery']
      },
      velocity: {
        deps: [ 'jquery' ]
      },
    }
});

require(['jquery'], function() {
  // Load the main app module to start the app
  requirejs(['pages/global']);
});

