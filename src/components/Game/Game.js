import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	setScore,
	setUserAnswer,
	toggleCurrentlyPlaying,
	setAnswerList,
	setCurrentQuestion,
	setErrors,
} from '../../actions';
import checkAccentError from '../../utils/checkAccentError';
import ProgressBar from '../ProgressBar/ProgressBar';
import incorrectIcon from '../../resources/incorrect-icon.png';
import correctIcon from '../../resources/correct-icon.png';
import previousIcon from '../../resources/previous.png';
import warningIcon from '../../resources/exclamation.png';
import './Game.css';

export default function Game() {
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const questionList = useSelector((state) => state.questionList);
	const currentQuestion = useSelector((state) => state.currentQuestion);
	const targetScore = useSelector((state) => state.targetScore);
	const currentScore = useSelector((state) => state.score);
	const answerList = useSelector((state) => state.answerList);
	const userAnswer = useSelector((state) => state.userAnswer);
	const selectedTenses = useSelector((state) => state.tenses);
	const selectedPronouns = useSelector((state) => state.pronouns);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const [validation, setValidation] = useState();
	const [buttonText, setButtonText] = useState('SUBMIT');

	// An array of characters with accents that will be used with buttons on the form.
	const specialCharacters = ['á', 'é', 'í', 'ó', 'ú', 'ñ'];

	function specialCharacterClick(evt) {
		// Add the special character to the user's answer. Check first if the answer field is empty.
		// If empty, set the character as the answer, otherwise append it to the current answer input.
		dispatch(
			setUserAnswer(
				userAnswer !== undefined
					? userAnswer + evt.target.value
					: evt.target.value
			)
		);

		// Refocus on the answer field.
		document.getElementById('answer-input').focus();
	}

	function handleClick() {
		if (buttonText === 'SUBMIT') {
			// Check whether an answer has been submitted.
			if (validateForm()) {
				// Covert the user's answer to lower case to prevent issues with capitalisation.
				const userAnswerLowerCase = userAnswer.toLowerCase();

				// Add to the list of answers. This will be used to review performance later.
				dispatch(
					setAnswerList([...answerList, { answer: userAnswerLowerCase }])
				);

				// Check whether the answer is correct
				if (currentQuestion.answers.includes(userAnswerLowerCase)) {
					// The answer is correct. Give positive feedback and increase the score.
					setValidation('correct');
					dispatch(setScore(currentScore + 1));
				} else {
					if (checkAccentError(currentQuestion.answers, userAnswerLowerCase)) {
						// Give positive feedback with warning about accents, and increase the score.
						setValidation('correct-with-issue');
						dispatch(setScore(currentScore + 1));
					} else {
						// The answer is incorrect. Give negative feedback.
						setValidation('incorrect');
					}
				}

				// Change the button text.
				setButtonText('CONTINUE');
			}
		} else {
			// Check whether this is the last question.
			if (currentQuestion.questionNumber === targetScore) {
				// End the game.
				dispatch(setUserAnswer(''));
				history.push('/feedback');
			} else {
				// Generate a new question.
				generateNextQuestion();

				window.setTimeout(function () {
					document.getElementById('answer-input').focus();
				}, 0);
			}
		}
	}

	function generateNextQuestion() {
		// Get the next question from the list.
		const nextQuestion = questionList[currentQuestion.questionNumber];
		const questionNumber = currentQuestion.questionNumber + 1;
		dispatch(
			setCurrentQuestion(
				questionNumber,
				nextQuestion.verb,
				nextQuestion.tense,
				nextQuestion.pronoun,
				nextQuestion.answers
			)
		);

		// Reset the button text and validation class.
		setButtonText('SUBMIT');
		setValidation('');

		// Clear the user answer and focus on the answer field.
		dispatch(setUserAnswer(''));
		document.getElementById('answer-input').focus();
	}

	function handleBackClick() {
		// The user has chosen to go back to the settings page. End the game and redirect.
		dispatch(toggleCurrentlyPlaying());
		history.push('/');
	}

	function validateForm() {
		let formErrors = {};
		let formIsValid = true;

		if (userAnswer === '') {
			formIsValid = false;
			formErrors['answer-input'] = 'Please enter an answer.';
		}

		dispatch(setErrors(formErrors));
		return formIsValid;
	}

	// Allow the user to submit their answer by clicking 'enter'.
	document.onkeydown = function (evt) {
		if (evt.code === 'Enter') {
			handleClick();
		}
	};

	// A method to change the button text when the display language changes.
	function renderButtonText() {
		if (displayLanguage === 'ENG') {
			if (buttonText !== 'SUBMIT') {
				return 'CONTINUE';
			}
			return 'SUBMIT';
		} else {
			if (buttonText !== 'SUBMIT') {
				return 'CONTINUAR';
			}
			return 'ENVIAR';
		}
	}

	return (
		<div className="game-container">
			<div className="navigation-section">
				<div className="nav-button">
					<input
						id="btn-previous"
						type="image"
						src={previousIcon}
						onClick={() => {
							if (
								window.confirm(
									displayLanguage === 'ENG'
										? 'Are you sure you wish to exit the game?'
										: '¿Estás seguro de que quieres terminar el juego?'
								)
							)
								handleBackClick();
						}}
						alt="Quit game"
					/>
				</div>
				<div className="progress-container">
					<ProgressBar
						currentQuestion={currentQuestion}
						targetScore={targetScore}
					/>
				</div>
			</div>

			<div className="game-section">
				<p className="section-title">
					{displayLanguage === 'ENG'
						? 'Conjugate the following verb:'
						: 'Conjugar el siguiente verbo:'}
				</p>
				<p id="verb">
					<p id="spanish-verb">{currentQuestion.spanishVerb}</p>
					<p id="english-verb">({currentQuestion.englishVerb})</p>
				</p>
				<div className="question-container">
					<div className="tense-pronoun">
						<p>
							<span className="left-span">
								<strong>
									{displayLanguage === 'ENG' ? 'Tense: ' : 'Tenso:'}
								</strong>
							</span>
							<span className="right-span">
								{displayLanguage === 'ENG'
									? currentQuestion.tense
									: selectedTenses.filter(
											(tense) => tense.tense === currentQuestion.tense
									  )[0].tenseESP}
							</span>
						</p>
						<p>
							<span className="left-span">
								<strong>
									{displayLanguage === 'ENG' ? 'Pronoun: ' : 'Pronombre: '}
								</strong>
							</span>
							<span className="right-span">
								{
									selectedPronouns.filter(
										(pronoun) => pronoun.pronoun === currentQuestion.pronoun
									)[0].name
								}
							</span>
						</p>
					</div>
					{errors['answer-input'] !== undefined && (
						<div className="validation-message centered">
							<img
								className="warning-image"
								src={warningIcon}
								alt="warning"
							></img>
							<span>{errors['answer-input']}</span>
						</div>
					)}
					<input
						id="answer-input"
						autoFocus
						value={userAnswer}
						onChange={(event) => dispatch(setUserAnswer(event.target.value))}
						tabIndex="1"
						disabled={buttonText === 'CONTINUE'}
					/>
					<div className="special-characters">
						{specialCharacters.map((character) => (
							<button
								onClick={specialCharacterClick}
								value={character}
								disabled={buttonText === 'CONTINUE'}
							>
								{character}
							</button>
						))}
					</div>
				</div>
			</div>
			<div className="validation-section">
				{validation === 'correct' && (
					<div className="correct answer-validation">
						<div className="validation-image">
							<img
								className="corect-image"
								src={correctIcon}
								alt="Correct icon."
							></img>
						</div>
						<div className="validation-comment">
							<p className="feedback-header">
								{displayLanguage === 'ENG' ? 'Correct!' : '¡Correcto!'}
							</p>
							<p>{displayLanguage === 'ENG' ? 'Well done!' : '¡Bien hecho!'}</p>
						</div>
					</div>
				)}
				{validation === 'correct-with-issue' && (
					<div className="correct-with-issue answer-validation">
						<div className="validation-image">
							<img
								className="corect-image"
								src={correctIcon}
								alt="Correct icon."
							></img>
						</div>
						<div className="validation-comment">
							<p className="feedback-header">
								{displayLanguage === 'ENG'
									? 'Correct, but please pay attention to accents!'
									: '¡Correcto, pero por favor preste atención a los acentos!'}
							</p>
							<p>
								{displayLanguage === 'ENG'
									? 'Correct solution(s):'
									: 'Solucion(es) correcta(s):'}{' '}
								{currentQuestion.answers.join(', ')}
							</p>
						</div>
					</div>
				)}
				{validation === 'incorrect' && (
					<div className="incorrect answer-validation">
						<div className="validation-image">
							<img
								className="incorect-image"
								src={incorrectIcon}
								alt="Incorrect icon."
							></img>
						</div>
						<div className="validation-comment">
							<p className="feedback-header">
								{displayLanguage === 'ENG'
									? 'Correct solution(s):'
									: 'Solucion(es) correcta(s):'}
							</p>
							<p>{currentQuestion.answers.join(', ')}</p>
						</div>
					</div>
				)}
			</div>
			<div className="button-section">
				<button type="submit" id="btn-submit" onMouseDown={handleClick}>
					{renderButtonText()}
				</button>
			</div>
		</div>
	);
}
