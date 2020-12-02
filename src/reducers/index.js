import { actionTypes, verbOptions } from '../actions';

const initialState = {
	tenses: [
		{
			category: 'indicative',
			tense: 'indicative-present',
			name: 'Present',
			selected: true,
			example: 'Vivo',
		},
		{
			category: 'indicative',
			tense: 'indicative-preterite',
			name: 'Peterite',
			selected: true,
			example: 'Viví',
		},
		{
			category: 'indicative',
			tense: 'indicative-imperfect',
			name: 'Imperfect',
			selected: true,
			example: 'Vivía',
		},
		{
			category: 'indicative',
			tense: 'indicative-conditional',
			name: 'Conditional',
			selected: true,
			example: 'Viviría',
		},
		{
			category: 'indicative',
			tense: 'indicative-future',
			name: 'Future',
			selected: true,
			example: 'Viviré',
		},
		{
			category: 'subjunctive',
			tense: 'subjunctive-present',
			name: 'Present',
			selected: false,
			example: 'Trabaje',
		},
		{
			category: 'subjunctive',
			tense: 'subjunctive-imperfect',
			name: 'Imperfect',
			selected: false,
			example: 'Trabajara',
		},
		{
			category: 'subjunctive',
			tense: 'subjunctive-future',
			name: 'Future',
			selected: false,
			example: 'Trabajare',
		},
		{
			category: 'imperative',
			tense: 'imperative-affirmative',
			name: 'Affirmative',
			selected: false,
			example: '¡Habla!',
		},
		{
			category: 'imperative',
			tense: 'imperative-negative',
			name: 'Negative',
			selected: false,
			example: '¡Habla!',
		},
		{
			category: 'continuous',
			tense: 'continuous-present',
			name: 'Present',
			selected: false,
			example: 'Estoy mirando',
		},
		{
			category: 'perfect',
			tense: 'perfect-present',
			name: 'Present',
			selected: false,
			example: 'He jugado',
		},
		{
			category: 'perfect',
			tense: 'perfect-past',
			name: 'Past',
			selected: false,
			example: 'Había jugado',
		},
		{
			category: 'perfect',
			tense: 'perfect-conditional',
			name: 'Conditional',
			selected: false,
			example: 'Habría jugado',
		},
		{
			category: 'perfect',
			tense: 'perfect-future',
			name: 'Future',
			selected: false,
			example: 'Habré jugado',
		},
	],
	pronouns: [
		{
			pronoun: 'yo',
			name: 'Yo',
			selected: true,
		},
		{
			pronoun: 'tu',
			name: 'Tú',
			selected: true,
		},
		{
			pronoun: 'el',
			name: 'Él, Ella, Ud.',
			selected: true,
		},
		{
			pronoun: 'nosotros',
			name: 'Nosotros',
			selected: true,
		},
		{
			pronoun: 'vosotros',
			name: 'Vosotros',
			selected: true,
		},
		{
			pronoun: 'ellos',
			name: 'Ellos, Ellas, Uds.',
			selected: true,
		},
	],
	verbSettings: {
		irregularVerbs: verbOptions.INCLUDE,
		reflexiveVerbs: verbOptions.INCLUDE,
		selectedVerbs: verbOptions.ALL,
		userDefinedVerbs: '', // Verbs the user has entered.
		validUserDefinedVerbs: [], // Verbs the user has entered that are valid verbs.
	},
	score: 0,
	targetScore: 10,
	currentlyPlaying: false,
	questionList: [],
	currentQuestion: {
		questionNumber: '',
		englishVerb: '',
		spanishVerb: '',
		pronoun: '',
		tense: '',
		conjugation: '',
		answers: [], //In some cases, there can be multiple correct answers.
	},
	userAnswer: '',
	errors: [],
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_TENSE:
			return {
				...state,
				tenses: state.tenses.map((tense) => {
					if (tense.tense === action.tense.tense) {
						return { ...tense, selected: !tense.selected };
					}
					return tense;
				}),
			};
		case actionTypes.TOGGLE_PRONOUN:
			return {
				...state,
				pronouns: state.pronouns.map((pronoun) => {
					if (pronoun.pronoun === action.pronoun.pronoun) {
						return { ...pronoun, selected: !pronoun.selected };
					}
					return pronoun;
				}),
			};
		case actionTypes.SET_IRREGULAR:
			return {
				...state,
				verbSettings: { ...state.verbSettings, irregularVerbs: action.option },
			};
		case actionTypes.SET_REFLEXIVE:
			return {
				...state,
				verbSettings: { ...state.verbSettings, reflexiveVerbs: action.option },
			};
		case actionTypes.SET_SELECTED_VERBS:
			return {
				...state,
				verbSettings: { ...state.verbSettings, selectedVerbs: action.option },
			};
		case actionTypes.SET_USER_DEFINED_VERBS:
			return {
				...state,
				verbSettings: {
					...state.verbSettings,
					userDefinedVerbs: action.verbString,
					validUserDefinedVerbs: action.validVerbs,
				},
			};
		case actionTypes.SET_SCORE:
			return {
				...state,
				score: action.score,
			};
		case actionTypes.SET_TARGET_SCORE:
			return {
				...state,
				targetScore: action.score,
			};
		case actionTypes.TOGGLE_CURRENTLY_PLAYING:
			return {
				...state,
				currentlyPlaying: !state.currentlyPlaying,
			};
		case actionTypes.SET_QUESTION_LIST:
			return {
				...state,
				questionList: action.list,
			};
		case actionTypes.SET_CURRENT_QUESTION:
			return {
				...state,
				currentQuestion: {
					questionNumber: action.questionNumber,
					englishVerb: action.verb.infinitive_english,
					spanishVerb: action.verb.infinitive,
					pronoun: action.pronoun,
					tense: action.tense,
					conjugation: '',
					answers: action.verb['conjugations'][action.tense][action.pronoun],
				},
			};
		case actionTypes.SET_USER_ANSWER:
			return {
				...state,
				userAnswer: action.answer,
			};
		case actionTypes.SET_ERRORS:
			return {
				...state,
				errors: action.errors,
			};
		default:
			return state;
	}
};

export default rootReducer;
