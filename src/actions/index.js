import VERB_DATA from '../data/data';

export const actionTypes = {
	TOGGLE_TENSE: 'TOGGLE_TENSE',
	TOGGLE_PRONOUN: 'TOGGLE_PRONOUN',
	SET_IRREGULAR: 'SET_IRREGULAR',
	SET_REFLEXIVE: 'SET_REFLEXIVE',
	SET_SELECTED_VERBS: 'SET_SELECTED_VERBS',
	SET_USER_DEFINED_VERBS: 'SET_USER_DEFINED_VERBS',
	GENERATE_QUESTION: 'GENERATE_QUESTION',
	SET_USER_ANSWER: 'SET_USER_ANSWER',
};

export const verbOptions = {
	ALL: 'ALL',
	COMMON: 'COMMON',
	USER_DEFINED: 'USER_DEFINED',
	INCLUDE: 'INCLUDE',
	EXCLUDE: 'EXCLUDE',
};

export function toggleTense(tense) {
	return { type: actionTypes.TOGGLE_TENSE, tense };
}

export function togglePronoun(pronoun) {
	return { type: actionTypes.TOGGLE_PRONOUN, pronoun };
}

export function setIrregularVerbs(option) {
	return { type: actionTypes.SET_IRREGULAR, option };
}

export function setReflexiveVerbs(option) {
	return { type: actionTypes.SET_REFLEXIVE, option };
}

export function setSelectedVerbs(option) {
	return { type: actionTypes.SET_SELECTED_VERBS, option };
}

export function setUserDefinedVerbs(verbsString) {
	// TODO: CHECK IF THE VERBS DEFINED BY THE USER ARE VALID. IF SO, ADD TO VALID VERBS ARRAY.
	return { type: actionTypes.SET_USER_DEFINED_VERBS, verbsString };
}

export function setUserAnswer(answer) {
	return { type: actionTypes.SET_USER_ANSWER, answer };
}

export function generateQuestion(tenses, pronouns, verbSettings) {
	// Select a random verb.
	const randomVerb = generateVerb(VERB_DATA, verbSettings);

	// Select a random tense from those chosen.
	const selectedTenses = tenses.filter(tense => tense.selected);
	const randomTense = selectedTenses[Math.floor(Math.random() * selectedTenses.length)];

	// Select a random pronoun from those chosen.
	const selectedPronouns = pronouns.filter(pronoun => pronoun.selected);
	const randomPronoun = selectedPronouns[Math.floor(Math.random() * selectedPronouns.length)];

	let test = randomVerb['conjugations'][randomTense.tense][randomPronoun.pronoun];

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
		// TODO: The user has selected to use custom verbs.
	}

	// Shuffle the array of verbs and return a random verb.
	return shuffleArray(verbsInPlay)[Math.floor(Math.random() * verbsInPlay.length)];
}

// A method to shuffle the array using Richard Durstenfeld's algorithm. This method picks a random element
// for each original array element, and excludes it from the next draw.
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
