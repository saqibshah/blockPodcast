<?php

/**
 * Plugin Name:       Ss Podcast
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ss-podcast
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function create_block_ss_podcast_block_init()
{
	register_block_type(__DIR__);
}
add_action('init', 'create_block_ss_podcast_block_init');


add_action('rest_api_init', function () {
	register_rest_route('ss-podcast/v1', '/getxml/(?P<id>[a-zA-Z0-9-\=]+)', array(
		'methods' => 'POST',
		'callback' => 'fetchXML',
		'permission_callback' => '__return_true',
	));
});

function fetchXML($request)
{
	$url = base64_decode($request['id']);
	$xml = simplexml_load_file($url);
	if ($xml) {
		$items = array();
		foreach ($xml->channel->item as $value) {
			$length = (string) $value->enclosure->attributes()->length; //(67960845*8)/128/1000/60 = 70.792546875
			$duration = 0;
			if ($length) {
				$duration = ($length * 8) / 128 / 1000 / 60;
			}

			$optValue = array(
				'description' => (string) $value->description,
				'pubDate' => (string) $value->pubDate,
				'value' => (string) $value->enclosure->attributes()->url,
				'duration' => $duration,
			);
			$items[] = array(
				'label' => (string) $value->title,
				'value' => json_encode($optValue)
			);
		}
		$result = array(
			'title' => (string) $xml->channel->title,
			'description' => (string) $xml->channel->description,
			'image' =>  $xml->channel->image,
			'items' =>  $items
		);

		return new WP_REST_Response($result);
		// return new WP_REST_Response($xml->channel);
		wp_die();
	}
	return new WP_Error('error', 'Couldn\'t fetch data');
	wp_die();
	// return new WP_REST_Response(['success' => true]);
}
function pr($p)
{
	echo "<pre>";
	print_r($p);
	echo "</pre>";
	die;
}
