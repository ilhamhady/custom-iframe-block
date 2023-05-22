<?php
/*
Plugin Name: Custom Iframe Block
Description: A custom Gutenberg block for embedding iframes with customizable width and aspect ratio.
Version: 1.0
Author: Muhammad Ilham
Author URI: https://www.linkedin.com/in/muhammad-ilham-shogir/
*/

// Enqueue the editor scripts
function custom_iframe_block_editor_scripts() {
    wp_enqueue_script(
        'custom-iframe-block-editor',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor' ),
        true
    );
}

add_action( 'enqueue_block_editor_assets', 'custom_iframe_block_editor_scripts' );

// Register the block
function custom_iframe_block_register() {
    register_block_type('custom-iframe-block/iframe', array(
        'render_callback' => 'custom_iframe_block_render',
        'attributes' => array(
            'url' => array(
                'type' => 'string',
            ),
            'width' => array(
                'type' => 'number',
                'default' => 750,
            ),
            'aspectRatio' => array(
                'type' => 'string',
                'default' => '16/9',
            ),
        ),
    ));
}
add_action('init', 'custom_iframe_block_register');

// Render the block on the front-end
function custom_iframe_block_render($attributes) {
    $url = isset($attributes['url']) ? $attributes['url'] : '';
    $width = isset($attributes['width']) ? $attributes['width'] : 750;
    $aspectRatio = isset($attributes['aspectRatio']) ? $attributes['aspectRatio'] : '16/9';

    // Check if the URL is valid.
    if (!filter_var($url, FILTER_VALIDATE_URL)) {
        return ''; // Return an empty string if the URL is not valid.
    }

    $aspectRatioArr = explode('/', $aspectRatio);
    // Calculate padding-top value for the responsive aspect ratio
    $paddingTop = (1 / ($aspectRatioArr[0] / $aspectRatioArr[1])) * 100;

    // Return a div with a responsive aspect ratio containing the iframe
    return sprintf('<div style="position: relative; overflow: hidden; padding-top: %s%%;"><iframe style="position: absolute; top: 0; left: 0; width: 100%%; height: 100%%;" src="%s"></iframe></div>', esc_attr($paddingTop), esc_attr($url));
}

// Add custom plugin meta links
function custom_iframe_block_plugin_row_meta($links, $file) {
    $plugin = plugin_basename(__FILE__);

    // Check to make sure we are on the correct plugin
    if ($file == $plugin) {
        // The anchor tag for the 'Repo' link
        $repo_link = '<a href="https://github.com/ilhamhady/custom-iframe-block" target="_blank">Repo</a>';
        // The anchor tag for the 'Contact' link
        $contact_link = '<a href="https://wa.me/6281232724414" target="_blank">Contact</a>';
        // Add the link to the end of the array
        $links[] = $repo_link;
        $links[] = $contact_link;
    }
    return $links;
}

add_filter('plugin_row_meta', 'custom_iframe_block_plugin_row_meta', 10, 2);
