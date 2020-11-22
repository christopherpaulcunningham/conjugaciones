export const actionTypes = {
	TOGGLE_TENSE: "TOGGLE_TENSE",
	TOGGLE_PRONOUN: "TOGGLE_PRONOUN",
	SET_IRREGULAR: "SET_IRREGULAR",
	SET_REFLEXIVE: "SET_REFLEXIVE",
	SET_SELECTED_VERBS: "SET_SELECTED_VERBS",
	SET_USER_DEFINED_VERBS: "SET_USER_DEFINED_VERBS",
	SET_USER_ANSWER: "SET_USER_ANSWER"
};

export const verbOptions = {
	ALL: "ALL",
	COMMON: "COMMON",
	USER_DEFINED: "USER_DEFINED",
	INCLUDE: "INCLUDE",
	EXCLUDE: "EXCLUDE",
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
