import { verbOptions } from '../actions';
import shuffleArray from "./shuffleArray";
import VERB_DATA from '../data/data';

export default function generateQuestion(tenses, pronouns, verbSettings) {
	// Select a random verb.
	const randomVerb = generateVerb(VERB_DATA, verbSettings);

	// Select a random tense from those chosen.
	const selectedTenses = shuffleArray(tenses).filter(tense => tense.selected);
	const randomTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];

	// Select a random pronoun from those chosen.
	const selectedPronouns = shuffleArray(pronouns).filter(pronoun => pronoun.selected);
	const randomPronoun = selectedPronouns[Math.floor(Math.random() * selectedPronouns.length)];

	const generatedQuestion = {
		verb: randomVerb,
		tense: randomTense.tense,
		pronoun: randomPronoun.pronoun
	}

	return generatedQuestion;
}

function generateVerb(verbArray, verbSettings) {
	// An array to hold the verbs which match the user's settings.
	let verbsInPlay = [];

	// Check the verb options which have been selected.
	if (verbSettings.selectedVerbs !== verbOptions.USER_DEFINED) {
		verbsInPlay = verbArray.filter(
			(verb) =>
				(verbSettings.irregularVerbs === verbOptions.INCLUDE ||
					(verbSettings.irregularVerbs === verbOptions.EXCLUDE &&
						!verb.irregular)) &&
				(verbSettings.reflexiveVerbs === verbOptions.INCLUDE ||
					(verbSettings.reflexiveVerbs === verbOptions.EXCLUDE &&
						!verb.reflexive)) &&
				(verbSettings.selectedVerbs === verbOptions.ALL ||
					(verbSettings.selectedVerbs === verbOptions.COMMON && verb.common))
		);
	} else {
		verbsInPlay = verbSettings.validUserDefinedVerbs;
	}

	// Shuffle the array of verbs and return a random verb.
	return shuffleArray(verbsInPlay)[Math.floor(Math.random() * verbsInPlay.length)];
}