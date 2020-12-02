import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	togglePronoun,
	setIrregularVerbs,
	setReflexiveVerbs,
	setSelectedVerbs,
	setUserDefinedVerbs,
	setQuestionList,
	toggleCurrentlyPlaying,
	setCurrentQuestion,
	setTargetScore,
	setErrors,
} from '../../actions';
import generateQuestionList from '../../utils/generateQuestionList';
import PronounItem from '../PronounItem/PronounItem';
import './VerbSettings.css';

export default function VerbSettings() {
	const tenses = useSelector((state) => state.tenses);
	const pronouns = useSelector((state) => state.pronouns);
	const verbSettings = useSelector((state) => state.verbSettings);
	const targetScore = useSelector((state) => state.targetScore);
	const errors = useSelector((state) => state.errors);

	const dispatch = useDispatch();
	const history = useHistory();

	function handleSubmitClick(){
		if (validateForm()) {
			setUpGame();
		}
	}
	
	const validateForm = () => {
		let formErrors = {};
		let formIsValid = true;

		// Check that at least one tense is selected.
		if (tenses.every((tense) => !tense.selected)) {
			formIsValid = false;
			formErrors['tenses'] = 'Please select at least one tense.';
		}

		// Check that at least one pronoun is selected.
		if (pronouns.every((pronoun) => !pronoun.selected)) {
			formIsValid = false;
			formErrors['pronouns'] = 'Please select at least one pronoun.';
		}

		// Validate the custom verbs input field.
		if (verbSettings.selectedVerbs === 'USER_DEFINED') {
			if (verbSettings.userDefinedVerbs === '') {
				// Check that the field has not been left blank.
				formIsValid = false;
				formErrors['custom-verbs'] = 'Please enter some verbs.';
			} else if (verbSettings.validUserDefinedVerbs.length === 0) {
				// Check that the verbs entered are actually valid.
				formIsValid = false;
				formErrors['custom-verbs'] =
					'Please enter some valid verbs seperated by a comma.';
			}
		}

		dispatch(setErrors(formErrors));
		return formIsValid;
	}

	function setUpGame() {
		setTimeout(() => {
			// Generate a list of questions.
			const questionList = generateQuestionList(
				tenses,
				pronouns,
				verbSettings,
				targetScore
			);
			dispatch(setQuestionList(questionList));

			// Check that the number of questions matches the target score. With custom verbs, this may not be the case.
			if (questionList.length < targetScore) {
				// Set the target score to the length of available questions.
				dispatch(setTargetScore(questionList.length));
			}

			// Setup the initial question.
			const intialQuestion = questionList[0];
			dispatch(
				setCurrentQuestion(
					1,
					intialQuestion.verb,
					intialQuestion.tense,
					intialQuestion.pronoun
				)
			);

			//Start the game. 
			dispatch(toggleCurrentlyPlaying());
			history.push('/game');
		}, 1000);
	}

	return (
		<div className="settings-column" id="settings-column">
			<div className="column-header">Additional Settings</div>
			<div className="validation-message">
				<span>{errors['pronouns']}</span>
			</div>
			<span className="section-header">Pronouns</span>
			<div className="settings-section">
				{pronouns.map((pronoun) => (
					<PronounItem
						key={pronoun.pronoun}
						id={pronoun.pronoun}
						name={pronoun.name}
						selected={pronoun.selected}
						onClick={() => dispatch(togglePronoun(pronoun))}
					/>
				))}
			</div>
			<span className="section-header">Verb Types</span>
			<div className="settings-section">
				<span>Irregular Verbs</span>
				<div className="btn-group">
					<input
						key={1}
						type="radio"
						id="irregular-include"
						checked={verbSettings.irregularVerbs === 'INCLUDE'}
						onClick={() => dispatch(setIrregularVerbs('INCLUDE'))}
					/>
					<label>Include</label>
					<input
						key={2}
						type="radio"
						id="irregular-exclude"
						checked={verbSettings.irregularVerbs === 'EXCLUDE'}
						onClick={() => dispatch(setIrregularVerbs('EXCLUDE'))}
					/>
					<label>Exclude</label>
				</div>
			</div>
			<div className="settings-section">
				<span>Reflexive Verbs</span>
				<div className="btn-group">
					<input
						key={3}
						type="radio"
						id="reflexive-include"
						checked={verbSettings.reflexiveVerbs === 'INCLUDE'}
						onClick={() => dispatch(setReflexiveVerbs('INCLUDE'))}
					/>
					<label>Include</label>
					<input
						key={4}
						type="radio"
						id="reflexive-exclude"
						checked={verbSettings.reflexiveVerbs === 'EXCLUDE'}
						onClick={() => dispatch(setReflexiveVerbs('EXCLUDE'))}
					/>
					<label>Exclude</label>
				</div>
			</div>
			<div className="settings-section">
				<span>Verbs To Use</span>
				<div className="btn-group">
					<input
						key={5}
						type="radio"
						id="verbs-all"
						checked={verbSettings.selectedVerbs === 'ALL'}
						onClick={() => dispatch(setSelectedVerbs('ALL'))}
					/>
					<label onClick={() => dispatch(setSelectedVerbs('ALL'))}>All</label>
					<input
						key={6}
						type="radio"
						id="verbs-common"
						checked={verbSettings.selectedVerbs === 'COMMON'}
						onClick={() => dispatch(setSelectedVerbs('COMMON'))}
					/>
					<label onClick={() => dispatch(setSelectedVerbs('COMMON'))}>
						The most common
					</label>
					<input
						key={7}
						type="radio"
						id="verbs-user-defined"
						checked={verbSettings.selectedVerbs === 'USER_DEFINED'}
						onClick={() => dispatch(setSelectedVerbs('USER_DEFINED'))}
					/>
					<label onClick={() => dispatch(setSelectedVerbs('USER_DEFINED'))}>
						The following:
					</label>
					<div className="validation-message">
						<span>{errors['custom-verbs']}</span>
					</div>
					<input
						id="custom-verbs"
						value={verbSettings.userDefinedVerbs}
						onChange={(evt) => dispatch(setUserDefinedVerbs(evt.target.value))}
						placeholder="Enter some verbs followed by a comma. e.g. estar, ver, hablar"
					></input>
				</div>
				<div className="button-section">
					<button type="submit" id="btn-start" onClick={handleSubmitClick}>
						Start
					</button>
				</div>
			</div>
		</div>
	);
}
