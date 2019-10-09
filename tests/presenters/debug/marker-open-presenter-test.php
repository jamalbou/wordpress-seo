<?php
/**
 * WPSEO plugin test file.
 */

namespace Yoast\WP\Free\Tests\Presenters;

use Mockery;
use Yoast\WP\Free\Presentations\Indexable_Presentation;
use Yoast\WP\Free\Presenters\Debug\Marker_Open_Presenter;
use Yoast\WP\Free\Helpers\Product_Helper;
use Yoast\WP\Free\Tests\TestCase;

/**
 * Class Marker_Open_Presenter_Test.
 *
 * @coversDefaultClass \Yoast\WP\Free\Presenters\Debug\Marker_Open_Presenter
 *
 * @group presenters
 * @group debug
 */
class Marker_Open_Presenter_Test extends TestCase {

	/**
	 * Tests the presentation of the open debug marker.
	 *
	 * @covers ::__construct
	 * @covers ::present
	 */
	public function test_present() {
		$product_helper_mock = Mockery::mock( Product_Helper::class );
		$product_helper_mock->expects( 'get_name' )->andReturn( 'Yoast SEO plugin' );

		$instance     = new Marker_Open_Presenter( $product_helper_mock );
		$presentation = new Indexable_Presentation();

		$this->assertEquals(
			'<!-- This site is optimized with the Yoast SEO plugin v' . \WPSEO_VERSION . ' - https://yoast.com/wordpress/plugins/seo/ -->',
			$instance->present( $presentation )
		);
	}

}
