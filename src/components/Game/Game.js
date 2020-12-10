import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	setScore,
	setUserAnswer,
	toggleCurrentlyPlaying,
	setCurrentQuestion,
	setErrors,
} from '../../actions';

import ProgressBar from '../ProgressBar/ProgressBar';
import incorrectIcon from '../../resources/incorrect-icon.png';
import correctIcon from '../../resources/correct-icon.png';
import previousIcon from '../../resources/previous.png';
import warningIcon from '../../resources/exclamation.png';
import './Game.css';

export default function Game() {
	const questionList = useSelector((state) => state.questionList);
	const currentQuestion = useSelector((state) => state.currentQuestion);
	const targetScore = useSelector((state) => state.targetScore);
	const currentScore = useSelector((state) => state.score);
	const userAnswer = useSelector((state) => state.userAnswer);
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

				// Check whether the answer is correct
				if (currentQuestion.answers.includes(userAnswerLowerCase)) {
					// The answer is correct. Give positive feedback and increase the score.
					setValidation('correct');
					dispatch(setScore(currentScore + 1));
				} else {
					if (checkAccentError(userAnswerLowerCase)) {
						// Give positive feedback with warning about accents, and increase the score.
						setValidation('correct-with-issue');
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

	// A function to check if the user's answer has a missing and/or extra accent, but is otherwise correct.
	function checkAccentError(answer) {
		let accentError = false;

		// Format the user's answer and the question answer(s) to remove accents.
		const formattedUserAnswer = answer
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
		const formattedQuestionAnswers = [];
		currentQuestion.answers.forEach((answer) => {
			formattedQuestionAnswers.push(
				answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			);
		});

		if (formattedQuestionAnswers.includes(formattedUserAnswer)) {
			accentError = true;
		}

		return accentError;
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

		console.log(userAnswer);

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
			// Refocus on the answer field.
			document.getElementById('answer-input').focus();
		}
	};

	// A function to capitalise the first letter of each word. Used for the tense and pronoun of the current question.
	function capitaliseString(string) {
		return string.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}

	return (
		<div className="game-container">
			<div className="navigation-section">
				<div className="nav-button">
					<input
						id="btn-previous"
						type="image"
						src={previousIcon}
						onClick={handleBackClick}
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
				<p className="section-title">Conjugate the following verb:</p>
				<p id="verb">
					<p id="spanish-verb">{currentQuestion.spanishVerb}</p>
					<p id="english-verb">({currentQuestion.englishVerb})</p>
				</p>
				<div className="question-container">
					<div className="tense-pronoun">
						<p><span className="left-span"><strong>Tense: </strong></span><span className="right-span">{capitaliseString(currentQuestion.tense.replace(/-/g, ' '))}</span></p>
						<p><span className="left-span"><strong>Pronoun: </strong></span><span className="right-span">{selectedPronouns.filter((pronoun) => pronoun.pronoun === currentQuestion.pronoun)[0].name}</span></p>	
									
					</div>
					{errors['answer-input'] !== undefined && (
						<div className="validation-message centered">
							<img class="warning-image" src={warningIcon} alt="warning"></img>
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
							<button onClick={specialCharacterClick} value={character}>
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
								class="corect-image"
								src={correctIcon}
								alt="Correct icon."
							></img>
						</div>
						<div className="validation-comment">
							<p className="feedback-header">Correct!</p>
							<p> Well done!</p>
						</div>
					</div>
				)}
				{validation === 'correct-with-issue' && (
					<div className="correct-with-issue answer-validation">
						<div className="validation-image">
							<img
								class="corect-image"
								src={correctIcon}
								alt="Correct icon."
							></img>
						</div>
						<div className="validation-comment">
							<p className="feedback-header">
								Correct, but please pay attention to accents!
							</p>
							<p>Correct solution: {currentQuestion.answers[0]}</p>
						</div>
					</div>
				)}
				{validation === 'incorrect' && (
					<div className="incorrect answer-validation">
						<div className="validation-image">
							<img
								class="incorect-image"
								src={incorrectIcon}
								alt="Incorrect icon."
							></img>
						</div>
						<div className="validation-comment">
							<p className="feedback-header">Correct solution:</p>
							<p>{currentQuestion.answers[0]}</p>
						</div>
					</div>
				)}
			</div>
			<div className="button-section">
				<button type="submit" id="btn-submit" onMouseDown={handleClick}>
					{buttonText}
				</button>
			</div>
		</div>
	);
}
