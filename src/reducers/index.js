import { actionTypes, verbOptions } from '../actions/types';

const initialState = {
	displayLanguage: 'ENG',
	tenses: [
		{
			id: '1',
			category: 'Indicative',
			tense: 'Indicative Present',
			tenseESP: 'Presente Indicativo',
			name: 'Present',
			nameESP: 'Presente',
			selected: true,
			example: 'Vivo',
		},
		{
			id: '2',
			category: 'Indicative',
			tense: 'Indicative Preterite',
			tenseESP: 'Pretérito Indicativo',
			name: 'Peterite',
			nameESP: 'Pretérito',
			selected: true,
			example: 'Viví',
		},
		{
			id: '3',
			category: 'Indicative',
			tense: 'Indicative Imperfect',
			tenseESP: 'Imperfecto Indicativo',
			name: 'Imperfect',
			nameESP: 'Imperfecto',
			selected: true,
			example: 'Vivía',
		},
		{
			id: '4',
			category: 'Indicative',
			tense: 'Indicative Conditional',
			tenseESP: 'Condicional Indicativo',
			name: 'Conditional',
			nameESP: 'Condicional',
			selected: true,
			example: 'Viviría',
		},
		{
			id: '5',
			category: 'Indicative',
			tense: 'Indicative Future',
			tenseESP: 'Futuro Indicativo',
			name: 'Future',
			nameESP: 'Futuro',
			selected: true,
			example: 'Viviré',
		},
		{
			id: '6',
			category: 'Subjunctive',
			tense: 'Subjunctive Present',
			tenseESP: 'Subjuntivo Presente',
			name: 'Present',
			nameESP: 'Presente',
			selected: false,
			example: 'Trabaje',
		},
		{
			id: '7',
			category: 'Imperative',
			tense: 'Imperative Affirmative',
			tenseESP: 'Imperativo Afirmativo',
			name: 'Affirmative',
			nameESP: 'Afirmativo',
			selected: false,
			example: '¡Habla!',
		},
		{
			id: '8',
			category: 'Imperative',
			tense: 'Imperative Negative',
			tenseESP: 'Imperativo Negativo',
			name: 'Negative',
			nameESP: 'Negativo',
			selected: false,
			example: '¡Habla!',
		},
		{
			id: '9',
			category: 'Continuous',
			tense: 'Continuous Present',
			tenseESP: 'Continous Presente',
			name: 'Present',
			nameESP: 'Presente',
			selected: false,
			example: 'Estoy mirando',
		},
		{
			id: '10',
			category: 'Perfect',
			tense: 'Perfect Present',
			tenseESP: 'Presente Perfecto',
			name: 'Present',
			nameESP: 'Presente',
			selected: false,
			example: 'He jugado',
		},
		{
			id: '11',
			category: 'Perfect',
			tense: 'Perfect Past',
			tenseESP: 'Pasado Perfecto',
			name: 'Past',
			nameESP: 'Pasado',
			selected: false,
			example: 'Había jugado',
		},
		{
			id: '12',
			category: 'Perfect',
			tense: 'Perfect Conditional',
			tenseESP: 'Condicional Perfecto',
			name: 'Conditional',
			nameESP: 'Condicional',
			selected: false,
			example: 'Habría jugado',
		},
		{
			id: '13',
			category: 'Perfect',
			tense: 'Perfect Future',
			tenseESP: 'Futuro Perfecto',
			name: 'Future',
			nameESP: 'Futuro',
			selected: false,
			example: 'Habré jugado',
		},
	],
	pronouns: [
		{
			id: '1',
			pronoun: 'yo',
			name: 'Yo',
			selected: true,
		},
		{
			id: '2',
			pronoun: 'tu',
			name: 'Tú',
			selected: true,
		},
		{
			id: '3',
			pronoun: 'el',
			name: 'Él, Ella, Ud.',
			selected: true,
		},
		{
			id: '4',
			pronoun: 'nosotros',
			name: 'Nosotros',
			selected: true,
		},
		{
			id: '5',
			pronoun: 'vosotros',
			name: 'Vosotros',
			selected: true,
		},
		{
			id: '6',
			pronoun: 'ellos',
			name: 'Ellos/as, Uds.',
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
	answerList: [],
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
	isLoading: false,
};

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_DISPLAY_LANGUAGE:
			return {
				...state,
				displayLanguage: action.language,
			};
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
		case actionTypes.SET_ANSWER_LIST:
			return {
				...state,
				answerList: action.list,
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
					answers: action.answers,
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
		case actionTypes.SET_IS_LOADING:
			return { 
				...state,
				isLoading: !state.isLoading
			}
		default:
			return state;
	}
};

export default rootReducer;
