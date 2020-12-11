import { verbOptions } from '../actions';
import shuffleArray from './shuffleArray';
import VERB_DATA from '../data/data';

export default function generateQuestionList(
	tenses,
	pronouns,
	verbSettings,
	targetScore
) {
	let questionList = [];
	const selectedTenses = shuffleArray(tenses).filter((tense) => tense.selected);
	const selectedPronouns = pronouns.filter((pronoun) => pronoun.selected);

	// Select a list of random verbs.
	const randomVerbList = generateVerbList(VERB_DATA, verbSettings, targetScore);

	// It's possible that the user has entered a custom verb and not enough verb options to create a full list.
	// Find all possible combinations from the user options.
	if (
		verbSettings.selectedVerbs === verbOptions.USER_DEFINED &&
		questionList.length < targetScore
	) {
		const optionsProperties = {
			verb: randomVerbList,
			tense: selectedTenses,
			pronoun: selectedPronouns,
		};

		let combinationsList = findAllCombinations(optionsProperties);

		// For each question in the list, add the answer(s).
		questionList = combinationsList.map((question, index) => ({
			questionNumber: index + 1,
			...question,
			answers: question.verb['conjugations'][question.tense][question.pronoun],
		}));

		if (questionList.length > targetScore) {
			// Trim the list so it contains the correct number of questions.
			questionList = questionList.slice(0, targetScore);
		}
	} else {
		// For each verb in the list, select a random tense and pronoun.
		randomVerbList.forEach((verb, index) => {
			// Select a random tense from those chosen.
			const randomTense = shuffleArray(selectedTenses)[
				Math.floor(Math.random() * selectedTenses.length)
			];

			// Select a random pronoun from those chosen.
			const randomPronoun = shuffleArray(selectedPronouns)[
				Math.floor(Math.random() * selectedPronouns.length)
			];

			questionList.push({
				questionNumber: index + 1,
				verb: verb,
				tense: randomTense.tense,
				pronoun: randomPronoun.pronoun,
				answers: verb['conjugations'][randomTense.tense][randomPronoun.pronoun],
			});
		});
	}

	return questionList;
}

// A method to find all possible combinations of objects.
function findAllCombinations(object) {
	let combinations = [{}];
	for (const [key, values] of Object.entries(object)) {
		combinations = combinations.flatMap((combo) =>
			values.map((value) => ({ ...combo, [key]: value }))
		);
	}

	combinations.forEach((verb) => {
		verb.pronoun = verb.pronoun.pronoun;
		verb.tense = verb.tense.tense;
	});

	return combinations;
}

function generateVerbList(verbArray, verbSettings, targetScore) {
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
