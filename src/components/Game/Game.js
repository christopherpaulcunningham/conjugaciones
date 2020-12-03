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
import './Game.css';

export default function Game() {
	const questionList = useSelector((state) => state.questionList);
	const currentQuestion = useSelector((state) => state.currentQuestion);
	const targetScore = useSelector((state) => state.targetScore);
	const currentScore = useSelector((state) => state.score);
	const userAnswer = useSelector((state) => state.userAnswer);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	const history = useHistory();

	const [validation, setValidation] = useState();
	const [buttonText, setButtonText] = useState('Submit');

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
	}

	function handleClick() {
		if (buttonText === 'Submit') {
			// Check whether an answer has been submitted.
			if (validateForm()) {
				// Check whether the answer is correct
				if (currentQuestion.answers.includes(userAnswer)) {
					// The answer is correct. Give positive feedback and increase the score.
					setValidation('correct');
					dispatch(setScore(currentScore + 1));
				} else {
					if (checkAccentError()) {
						// Give positive feedback with warning about accents, and increase the score.
						setValidation('correct-missing-accents');
					} else {
						// The answer is incorrect. Give negative feedback.
						setValidation('incorrect');
					}
				}

				// Change the button text.
				setButtonText('Continue');
			}
		} else {
			// Check whether this is the last question.
			if (currentQuestion.questionNumber === targetScore) {
				// End the game.
				dispatch(setUserAnswer(''))
				history.push('/feedback');
			} else {
				// Generate a new question.
				generateNextQuestion();
			}
		}
	}

	// A function to check if the user's answer has a missing and/or extra accent, but is otherwise correct.
	function checkAccentError() {
		let accentError = false;

		// Format the user's answer and the question answer(s) to remove accents.
		const formattedUserAnswer = userAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		const formattedQuestionAnswers = [];
		currentQuestion.answers.forEach((answer) => {
			formattedQuestionAnswers.push(
				answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
			);
		});

		if(formattedQuestionAnswers.includes(formattedUserAnswer)){
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
				nextQuestion.answer
			)
		);

		// Reset the button text and validation class.
		setButtonText('Submit');
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

	return (
		<div className="game-container">
			<div className="nav-button">
				<button onClick={handleBackClick}> Back </button>
			</div>
			<div className="score-container">
				<strong>Current Score: </strong>
				{currentScore}
			</div>
			<div className="game-section">
				<p className="section-title">Conjugate the following verb:</p>
				<p id="verb">
					<span id="spanish-verb">{currentQuestion.spanishVerb}</span> -{' '}
					<span id="english-verb">{currentQuestion.englishVerb}</span>
				</p>
				<div className="question-container">
					<p id="tense-pronoun">
						{currentQuestion.tense} tense - {currentQuestion.pronoun}
					</p>
					<div className="validation-message">
						<span>{errors['answer-input']}</span>
					</div>
					<input
						id="answer-input"
						autoFocus
						value={userAnswer}
						onChange={(event) => dispatch(setUserAnswer(event.target.value))}
					/>
					<div className="button-container">
						{specialCharacters.map((character) => (
							<button onClick={specialCharacterClick} value={character}>
								{character}
							</button>
						))}
					</div>
				</div>
			</div>
			{validation === 'correct' && (
				<div className="correct">
					<p>CORRECT!</p>
				</div>
			)}
			{validation === 'correct-missing-accents' && (
				<div className="correct-missing-accents">
					<p>CORRECT, BUT PLEASE PAY ATTENTION TO ACCENTS!</p>
					<p>Correct Answer: {currentQuestion.answers[0]}</p>
				</div>
			)}
			{validation === 'incorrect' && (
				<div className="incorrect">
					<p>INCORRECT!</p>
					<p>Correct Answer: {currentQuestion.answers[0]}</p>
				</div>
			)}
			<button id="btn-submit" onClick={handleClick}>
				{buttonText}
			</button>
		</div>
	);
}
