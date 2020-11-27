import { verbOptions } from '../actions';
import shuffleArray from "./shuffleArray";
import VERB_DATA from '../data/data';

export default function generateQuestionList(tenses, pronouns, verbSettings, targetScore) {
	const questionList = [];
	
	// Select a list random verbs.
	const randomVerbList = generateVerbList(VERB_DATA, verbSettings, targetScore);
	const randomVerb = generateVerb(VERB_DATA, verbSettings);
	
	// For each verb in the list, select a random tense and pronoun.
	randomVerbList.map(verb => {
		// Select a random tense from those chosen.
		const selectedTenses = shuffleArray(tenses).filter(tense => tense.selected);
		const randomTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];

		// Select a random pronoun from those chosen.
		const selectedPronouns = shuffleArray(pronouns).filter(pronoun => pronoun.selected);
		const randomPronoun = selectedPronouns[Math.floor(Math.random() * selectedPronouns.length)];
			
		questionList.push({
			verb: verb,
			tense: randomTense.tense,
			pronoun: randomPronoun.pronoun
		})
	})

	return questionList;
}

function generateVerbList(verbArray, verbSettings, targetScore){
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

	// Shuffle the array of verbs and return a list of questions.
	verbsInPlay = shuffleArray(verbsInPlay);
	return verbsInPlay.slice(0, targetScore);
}