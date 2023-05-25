<?php
/*
Plugin Name: Custom Iframe Block
Plugin URI: https://github.com/ilhamhady/custom-iframe-block
Description: A Gutenberg block for embedding responsive iframes with custom dimensions and aspect ratio.
Version: 1.0.1
Author: Muhammad Ilham
Author URI: https://www.linkedin.com/in/muhammad-ilham-shogir/
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: custom-iframe-block
*/

function custom_iframe_block_scripts() {
    // Enqueue the bundled block JS file
    wp_enqueue_script(
        'custom-iframe-block',
        plugins_url('build/index.js', __FILE__),
        ['wp-blocks', 'wp-i18n', 'wp-editor'],
        true
    );
}

// Hook the enqueue functions into the frontend and editor
add_action('enqueue_block_assets', 'custom_iframe_block_scripts');
