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
	setUserAnswer,
	setAnswerList,
} from '../../actions';
import generateQuestionList from '../../utils/generateQuestionList';
import PronounItem from '../PronounItem/PronounItem';
import warning from '../../resources/exclamation.png';
import './VerbSettings.css';

export default function VerbSettings() {
	const displayLanguage = useSelector((state) => state.displayLanguage);
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
			let questionList = [];
			// Reset the state of the game.
			resetGameState();

			// Generate a list of questions.
			questionList = generateQuestionList(
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

			//Start the game.
			dispatch(toggleCurrentlyPlaying());
			history.push('/game');
		}, 1000);
	}

	// A method to reset the state of a number of fields to start the game with a clean state.
	function resetGameState() {
		dispatch(setUserAnswer(''));
		dispatch(setAnswerList([]));
	}

	return (
		<div className="settings-container">
			<div className="settings-title">
				{displayLanguage === 'ENG'
					? 'Additional Settings'
					: 'Ajustes Adicionales'}
			</div>
			<div className="section">
				{errors['pronouns'] !== undefined && (
					<div className="validation-message">
						<img className="warning-image" src={warning} alt="warning"></img>
						<span>{errors['pronouns']}</span>
					</div>
				)}
				<span className="section-header">
					{displayLanguage === 'ENG' ? 'Pronouns' : 'Pronombres'}
				</span>
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
				<span className="section-header">
					{displayLanguage === 'ENG' ? 'Verb Types' : 'Tipos de Verbos'}
				</span>
				<div className="settings-section">
					<span>
						{displayLanguage === 'ENG'
							? 'Irregular Verbs'
							: 'Verbos Irregulares'}
					</span>
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
							{displayLanguage === 'ENG' ? 'Include' : 'Incluir'}
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
							{displayLanguage === 'ENG' ? 'Exclude' : 'Excluir'}
						</label>
					</div>
				</div>
				<div className="settings-section">
					<span>
						{displayLanguage === 'ENG'
							? 'Reflexive Verbs'
							: 'Verbos Reflexivos'}
					</span>
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
							{displayLanguage === 'ENG' ? 'Include' : 'Incluir'}
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
							{displayLanguage === 'ENG' ? 'Exclude' : 'Excluir'}
						</label>
					</div>
				</div>
				<div className="settings-section">
					<span>
						{displayLanguage === 'ENG'
							? 'Which verbs do you wish to use?'
							: '¿Qué verbos quieres incluir?'}
					</span>
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
							{displayLanguage === 'ENG' ? 'All' : 'Todos'}
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
							{displayLanguage === 'ENG' ? 'Common' : 'Común'}
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
							{displayLanguage === 'ENG' ? 'Custom' : 'Elige'}
						</label>
					</div>
					{verbSettings.selectedVerbs === 'USER_DEFINED' && (
						<div>
							{errors['custom-verbs'] !== undefined && (
								<div className="validation-message">
									<img
										className="warning-image"
										src={warning}
										alt="warning"
									></img>
									<span>{errors['custom-verbs']}</span>
								</div>
							)}
							<textarea
								id="custom-verbs"
								rows="3"
								value={verbSettings.userDefinedVerbs}
								onChange={(evt) =>
									dispatch(setUserDefinedVerbs(evt.target.value))
								}
								placeholder={
									displayLanguage === 'ENG'
										? 'Enter some verbs followed by a comma - e.g. estar, ver, hablar.'
										: 'Introduzca algunos verbos seguidos de una coma - p. ej. estar, ver, hablar.'
								}
							></textarea>
						</div>
					)}
					<div className="button-section">
						<button
							type="submit"
							id="btn-start"
							className="no-select"
							onClick={handleSubmitClick}
						>
							{displayLanguage === 'ENG' ? 'START' : 'INICIO'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
