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
} from '../../actions/gameActions';
import { verbOptions } from '../../actions/types';
import generateQuestionList from '../../utils/generateQuestionList';

import PronounItem from '../PronounItem/PronounItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RadioButton from '../RadioButton/RadioButton';

import './VerbSettings.css';

const VerbSettings = () => {
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const tenses = useSelector((state) => state.tenses);
	const pronouns = useSelector((state) => state.pronouns);
	const verbSettings = useSelector((state) => state.verbSettings);
	const targetScore = useSelector((state) => state.targetScore);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const validateForm = () => {
		let formErrors = {};
		let formIsValid = true;

		// Check that at least one tense is selected.
		if (tenses.every((tense) => !tense.selected)) {
			formIsValid = false;
			formErrors['tenses'] =
				displayLanguage === 'ENG'
					? 'Please select at least one tense.'
					: 'Seleccione al menos un tiempo.';
		}

		// Check that at least one pronoun is selected.
		if (pronouns.every((pronoun) => !pronoun.selected)) {
			formIsValid = false;
			formErrors['pronouns'] =
				displayLanguage === 'ENG'
					? 'Please select at least one pronoun.'
					: 'Seleccione al menos un pronombre.';
		}

		// Validate the custom verbs input field.
		if (verbSettings.selectedVerbs === verbOptions.USER_DEFINED) {
			if (verbSettings.userDefinedVerbs === '') {
				// Check that the field has not been left blank.
				formIsValid = false;
				formErrors['custom-verbs'] =
					displayLanguage === 'ENG'
						? 'Please enter some verbs.'
						: 'Por favor, introduzca algunos verbos.';
			} else if (verbSettings.validUserDefinedVerbs.length === 0) {
				// Check that the verbs entered are actually valid.
				formIsValid = false;
				formErrors['custom-verbs'] =
					displayLanguage === 'ENG'
						? 'Please enter some valid verbs seperated by a comma.'
						: 'Introduce algunos verbos válidos separados por una coma.';
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

	// Reset the game.
	function resetGameState() {
		dispatch(setUserAnswer(''));
		dispatch(setAnswerList([]));
	}

	function handleSubmitClick() {
		if (validateForm()) {
			setUpGame();
		}
	}

	return (
		<div className="settings-container">
			<h2 className="settings-header">
				{displayLanguage === 'ENG'
					? 'Additional Settings'
					: 'Ajustes Adicionales'}
			</h2>
			{errors['pronouns'] !== undefined && (
				<div className="selection-error">
					<ErrorMessage message={errors['pronouns']} />
				</div>
			)}
			<div className="settings-section-header">
				{displayLanguage === 'ENG' ? 'Pronouns' : 'Pronombres'}
			</div>
			<div className="settings-section pronoun-section">
				{pronouns.map((pronoun) => (
					<PronounItem
						key={pronoun.pronoun}
						id={pronoun.pronoun}
						name={pronoun.name}
						checked={pronoun.selected}
						onChange={() => dispatch(togglePronoun(pronoun))}
					/>
				))}
			</div>
			<div className="settings-section">
				<span className="settings-section-header">
					{displayLanguage === 'ENG' ? 'Irregular Verbs' : 'Verbos Irregulares'}
				</span>
				<div className="button-group">
					<RadioButton
						type="radio"
						id="irregular-include"
						checked={verbSettings.irregularVerbs === verbOptions.INCLUDE}
						onChange={() => dispatch(setIrregularVerbs(verbOptions.INCLUDE))}
						name={displayLanguage === 'ENG' ? 'Include' : 'Incluir'}
					/>
					<RadioButton
						type="radio"
						id="irregular-exclude"
						checked={verbSettings.irregularVerbs === verbOptions.EXCLUDE}
						onChange={() => dispatch(setIrregularVerbs(verbOptions.EXCLUDE))}
						name={displayLanguage === 'ENG' ? 'Exclude' : 'Excluir'}
					/>
				</div>
			</div>
			<div className="settings-section">
				<span className="settings-section-header">
					{displayLanguage === 'ENG' ? 'Reflexive Verbs' : 'Verbos Reflexivos'}
				</span>
				<div className="button-group">
					<RadioButton
						type="radio"
						id="reflexive-include"
						checked={verbSettings.reflexiveVerbs === verbOptions.INCLUDE}
						onChange={() => dispatch(setReflexiveVerbs(verbOptions.INCLUDE))}
						name={displayLanguage === 'ENG' ? 'Include' : 'Incluir'}
					/>
					<RadioButton
						type="radio"
						id="reflexive-exclude"
						checked={verbSettings.reflexiveVerbs === verbOptions.EXCLUDE}
						onChange={() => dispatch(setReflexiveVerbs(verbOptions.EXCLUDE))}
						name={displayLanguage === 'ENG' ? 'Exclude' : 'Excluir'}
					/>
				</div>
			</div>
			<div className="settings-section">
				<span className="settings-section-header">
					{displayLanguage === 'ENG'
						? 'Which verbs do you wish to use?'
						: '¿Qué verbos quieres incluir?'}
				</span>
				<div className="button-group">
					<RadioButton
						type="radio"
						id="verbs-all"
						checked={verbSettings.selectedVerbs === verbOptions.ALL}
						onChange={() => dispatch(setSelectedVerbs(verbOptions.ALL))}
						name={displayLanguage === 'ENG' ? 'All' : 'Todos'}
					/>
					<RadioButton
						type="radio"
						id="verbs-common"
						checked={verbSettings.selectedVerbs === verbOptions.COMMON}
						onChange={() => dispatch(setSelectedVerbs(verbOptions.COMMON))}
						name={displayLanguage === 'ENG' ? 'Common' : 'Común'}
					/>
					<RadioButton
						type="radio"
						id="verbs-user-defined"
						checked={verbSettings.selectedVerbs === verbOptions.USER_DEFINED}
						onChange={() =>
							dispatch(setSelectedVerbs(verbOptions.USER_DEFINED))
						}
						name={displayLanguage === 'ENG' ? 'Custom' : 'Elige'}
					/>
				</div>
				{verbSettings.selectedVerbs === verbOptions.USER_DEFINED && (
					<div>
						{errors['custom-verbs'] !== undefined && (
							<div className="extra-space-top">
								<ErrorMessage
									message={errors['custom-verbs']}
									className="custom-verbs-error"
								/>
							</div>
						)}
						<textarea
							id="custom-verbs"
							className="custom-verbs"
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
			</div>
			<div className="button-section">
				<button
					type="submit"
					id="btn-start"
					className="btn-start"
					onClick={handleSubmitClick}
				>
					{displayLanguage === 'ENG' ? 'START' : 'INICIO'}
				</button>
			</div>
		</div>
	);
};

export default VerbSettings;
