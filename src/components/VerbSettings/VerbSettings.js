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
	setUserAnswer
} from '../../actions';
import generateQuestionList from '../../utils/generateQuestionList';
import PronounItem from '../PronounItem/PronounItem';
import warning from '../../resources/exclamation.png';
import './VerbSettings.css';

export default function VerbSettings() {
	const tenses = useSelector((state) => state.tenses);
	const pronouns = useSelector((state) => state.pronouns);
	const verbSettings = useSelector((state) => state.verbSettings);
	const targetScore = useSelector((state) => state.targetScore);
	const errors = useSelector((state) => state.errors);

	const dispatch = useDispatch();
	const history = useHistory();

	function handleSubmitClick() {
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
	};

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
			const initialQuestion = questionList[0];
			dispatch(
				setCurrentQuestion(
					1,
					initialQuestion.verb,
					initialQuestion.tense,
					initialQuestion.pronoun, 
					initialQuestion.answers
				)
			);

			// Clear the user answer, incase the user has played previously.
			dispatch(setUserAnswer(''));

			//Start the game.
			dispatch(toggleCurrentlyPlaying());
			history.push('/game');
		}, 1000);
	}

	return (
		<div className="settings-container">
			<div className="settings-title">Additional Settings</div>
			<div className="section">
				{errors['pronouns'] !== undefined && (
					<div className="validation-message">
						<img class="warning-image" src={warning} alt="warning"></img>
						<span>{errors['pronouns']}</span>
					</div>
				)}
				<span className="section-header">Pronouns</span>
				<div className="settings-section pronoun-section">
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
					<div className="button-group">
						<input
							type="radio"
							id="irregular-include"
							checked={verbSettings.irregularVerbs === 'INCLUDE'}
						/>
						<label
							className="button-left"
							htmlFor="irregular-include"
							onClick={() => dispatch(setIrregularVerbs('INCLUDE'))}
						>
							INCLUDE
						</label>
						<input
							type="radio"
							id="irregular-exclude"
							checked={verbSettings.irregularVerbs === 'EXCLUDE'}
						/>
						<label
							className="button-right"
							htmlFor="irregular-exclude"
							onClick={() => dispatch(setIrregularVerbs('EXCLUDE'))}
						>
							EXCLUDE
						</label>
					</div>
				</div>
				<div className="settings-section">
					<span>Reflexive Verbs</span>
					<div className="button-group">
						<input
							type="radio"
							id="reflexive-include"
							checked={verbSettings.reflexiveVerbs === 'INCLUDE'}
						/>
						<label
							className="button-left"
							htmlFor="reflexive-include"
							onClick={() => dispatch(setReflexiveVerbs('INCLUDE'))}
						>
							INCLUDE
						</label>
						<input
							type="radio"
							id="reflexive-exclude"
							checked={verbSettings.reflexiveVerbs === 'EXCLUDE'}
						/>
						<label
							className="button-right"
							htmlFor="reflexive-exclude"
							onClick={() => dispatch(setReflexiveVerbs('EXCLUDE'))}
						>
							EXCLUDE
						</label>
					</div>
				</div>
				<div className="settings-section">
					<span>Verbs To Use</span>
					<div className="button-group">
						<input
							type="radio"
							id="verbs-all"
							checked={verbSettings.selectedVerbs === 'ALL'}
						/>
						<label
							className="button-left"
							htmlFor="verbs-all"
							onClick={() => dispatch(setSelectedVerbs('ALL'))}
						>
							ALL
						</label>
						<input
							type="radio"
							id="verbs-common"
							checked={verbSettings.selectedVerbs === 'COMMON'}
						/>
						<label
							className="button-middle"
							htmlFor="verbs-common"
							onClick={() => dispatch(setSelectedVerbs('COMMON'))}
						>
							COMMON
						</label>
						<input
							type="radio"
							id="verbs-user-defined"
							checked={verbSettings.selectedVerbs === 'USER_DEFINED'}
						/>
						<label
							className="button-right"
							htmlFor="verbs-user-defined"
							onClick={() => dispatch(setSelectedVerbs('USER_DEFINED'))}
						>
							CUSTOM
						</label>
					</div>
					{verbSettings.selectedVerbs === 'USER_DEFINED' && (
						<div>
							{errors['custom-verbs'] !== undefined && (
								<div className="validation-message">
									<img class="warning-image" src={warning} alt="warning"></img>
									<span>{errors['custom-verbs']}</span>
								</div>
							)}
							<input
								id="custom-verbs"
								value={verbSettings.userDefinedVerbs}
								onChange={(evt) =>
									dispatch(setUserDefinedVerbs(evt.target.value))
								}
								placeholder="Enter some verbs followed by a comma. e.g. estar, ver, hablar"
							></input>
						</div>
					)}
					<div className="button-section">
<<<<<<< HEAD
						<button type="submit" id="btn-start" className="no-select" onClick={handleSubmitClick}>
=======
						<button type="submit" id="btn-start" onClick={handleSubmitClick}>
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
							START
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
