import { Fragment } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";

import PropTypes from "prop-types";
import RadioGroup from "../../base/radio-group";
import { NewsletterSignup } from "./newsletter-signup";

/**
 * Doc comment to make linter happy.
 *
 * @param {Object}   state                    The state
 * @param {function} setTracking              Callback function to update tracking preference
 * @param {Boolean}  isTrackingOptionSelected Wether the tracking option is selected
 *
 * @returns {JSX.Element} Example step.
 */
export default function PersonalPreferencesStep( { state, setTracking } ) {
	return <Fragment>
		<h3 className="yst-text-gray-900 yst-leading-6 yst-font-normal">
			{
				// translators: %s is replaced by "Yoast SEO"
				sprintf( __( "%s usage tracking", "wordpress-seo" ), "Yoast SEO" )
			}
		</h3>
		<p className="yst-text-normal yst-mt-2 yst-mb-4">{ __( "Can we collect anonymous information about your website and how you use it?", "wordpress-seo" ) }</p>
		{ <RadioGroup
			id="yoast-configuration-tracking-radio-button"
			name="yoast-configuration-tracking"
			value={ state.tracking }
			onChange={ setTracking }
			options={ [
				{
					value: 0,
					label: __( "No, don’t track my site data", "wordpress-seo" ),
				},
				{
					value: 1,
					label: __( "Yes, you can track my site data", "wordpress-seo" ),
				},
			] }
		/> }
		<p className="yst-my-2">
			<i>{
				__( "Important: We will never sell this data. And of course, as always, we won't collect any personal data about you or your visitors!", "wordpress-seo" )
			}</i>
		</p>
		<br />
		<NewsletterSignup gdprLink={ window.wpseoWorkoutsData.configuration.shortlinks.gdpr } />
	</Fragment>;
}

PersonalPreferencesStep.propTypes = {
	state: PropTypes.object.isRequired,
	setTracking: PropTypes.func.isRequired,
};
