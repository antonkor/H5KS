<?php

// Google CDN jQuery
wp_deregister_script( 'jquery' );
wp_register_script( 'jquery', 'http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
wp_enqueue_script( 'jquery' );


// Show template used in header
add_action('wp_head', 'show_template');
function show_template() {
  global $template;
  print_r($template);
}


// Creates sharethis shortcode
if (function_exists('st_makeEntries')) :
  add_shortcode('sharethis', 'st_makeEntries');
endif;


?>