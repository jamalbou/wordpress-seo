/** @module researches/countKeywordInUrl */
import parseSlug from "../helpers/url/parseSlug";
import { findTopicFormsInString } from "../helpers/match/findKeywordFormsInString.js";

/**
 * Splits hyphenated keyphrases so that each compound is an individual word, e.g. 'pop-art' becomes 'pop' and 'art'.
 * Splitting the keyphrase forms allows for hyphenated keyphrases to be detected in the slug. The slug is parsed on hyphens, and the words from
 * the keyphrase are compared with the words from the slug to find a match. Without dehyphenating the keyphrase, the word from the keyphrase would be
 * 'pop-art' while the words from the slug would be 'pop' and 'art', and a match would not be detected.
 *
 * @param {Array} topicForms The keyphraseForms and synonymsForms of the paper.
 *
 * @returns {Array} topicForms with split compounds.
 */
function dehyphenateKeyphraseForms( topicForms ) {
	const dehyphenatedKeyphraseForms = [];

	topicForms.keyphraseForms.forEach( function( wordForms ) {
		// If a word doesn't contain hyphens, don't split it.
		if ( wordForms[ 0 ].indexOf( "-" ) === -1 ) {
			dehyphenatedKeyphraseForms.push( wordForms );
			return;
		}

		// Split each form of a hyphenated word and add each compound to the array of dehyphenated keyphrase forms.
		wordForms.forEach( function( wordForm ) {
			const splitWordForm = wordForm.split( "-" );
			splitWordForm.forEach( compound => dehyphenatedKeyphraseForms.push( [ compound ] ) );
		} );
	} );
	topicForms.keyphraseForms = dehyphenatedKeyphraseForms;

	return topicForms;
}

/**
 * Matches the keyword in the URL. Replaces dashes and underscores with whitespaces and uses whitespace as wordboundary.
 *
 * @param {Paper} paper the Paper object to use in this count.
 * @param {Researcher} researcher The Researcher object containing all available researches.
 *
 * @returns {int} Number of times the keyword is found.
 */
export default function( paper, researcher ) {
	const topicForms = dehyphenateKeyphraseForms( researcher.getResearch( "morphology" ) );
	const parsedSlug = parseSlug( paper.getSlug() );

	const keyphraseInSlug = findTopicFormsInString( topicForms, parsedSlug, false, paper.getLocale() );

	return {
		keyphraseLength: topicForms.keyphraseForms.length,
		percentWordMatches: keyphraseInSlug.percentWordMatches,
	};
}
