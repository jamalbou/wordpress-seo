<?php
/**
 * A helper object for post related things.
 *
 * @package Yoast\YoastSEO\Helpers
 */

namespace Yoast\WP\SEO\Helpers;

/**
 * Class Redirect_Helper
 */
class Post_Helper {

	/**
	 * Holds the String_Helper instance.
	 *
	 * @var String_Helper
	 */
	private $string;

	/**
	 * Post_Helper constructor.
	 *
	 * @param String_Helper $string The string helper.
	 *
	 * @codeCoverageIgnore It only sets dependencies.
	 */
	public function __construct( String_Helper $string ) {
		$this->string = $string;
	}

	/**
	 * Removes all shortcode tags from the given content.
	 *
	 * @param string $content Content to remove all the shortcode tags from.
	 *
	 * @codeCoverageIgnore It only wraps a WordPress function.
	 *
	 * @return string Content without shortcode tags.
	 */
	public function strip_shortcodes( $content ) {
		return \strip_shortcodes( $content );
	}

	/**
	 * Retrieves the post excerpt (without tags).
	 *
	 * @param int $post_id Post ID.
	 *
	 * @codeCoverageIgnore It only wraps another helper method.
	 *
	 * @return string Post excerpt (without tags).
	 */
	public function get_the_excerpt( $post_id ) {
		return $this->string->strip_all_tags( \get_the_excerpt( $post_id ) );
	}

	/**
	 * Retrieves the post type of the current post.
	 *
	 * @param \WP_Post $post The post.
	 *
	 * @codeCoverageIgnore It only wraps a WordPress function.
	 *
	 * @return string|false Post type on success, false on failure.
	 */
	public function get_post_type( $post = null ) {
		return \get_post_type( $post );
	}

	/**
	 * Retrieves the post title with fallback to `No title`.
	 *
	 * @param int $post_id Optional. Post ID.
	 *
	 * @return string The post title with fallback to `No title`.
	 */
	public function get_post_title_with_fallback( $post_id = 0 ) {
		$post_title = \get_the_title( $post_id );
		if ( $post_title ) {
			return $post_title;
		}

		return  __( 'No title', 'wordpress-seo' );
	}
}
