import React from 'react';	
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
	};

	function submitAnswer() {
		// Check that the user has provided an answer.
		if(validateForm()){
			// Check if the answer is correct.
			if (currentQuestion.answers.includes(userAnswer)) {
				// TODO: The answer is correct. Give feedback to the user.
				

				// Check if this is the last question.
				if (currentQuestion.questionNumber === targetScore) {
					dispatch(toggleCurrentlyPlaying());
					history.push("/feedback");
					
				} else {
					// Increase the score and generate a new question.
					dispatch(setScore(currentScore + 1));
					generateNextQuestion();
				}
			} else {
				// TODO: The answer is incorrect. Give feedback to the user.
				
				generateNextQuestion();
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
				nextQuestion.answer
			)
		);

		// Clear the user answer and focus on the answer field.
		dispatch(setUserAnswer(''));
		document.getElementById('answer-input').focus();
	}

	function handleBackClick() {
		// The user has chosen to go back to the settings page. End the game and redirect.
		dispatch(toggleCurrentlyPlaying());
		history.push('/');
	}

	const validateForm = () => {
		let formErrors = {};
		let formIsValid = true;

		console.log(userAnswer);

		if(userAnswer === ''){
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
			<button id="btn-submit" onClick={submitAnswer}>
				Submit
			</button>
		</div>
	);
}
