import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	setScore,
	setUserAnswer,
	toggleCurrentlyPlaying,
	setCurrentQuestion,
} from '../../actions';
import generateQuestion from "../../utils/generateQuestion"
import './Game.css';

export default function Game() {
	const tenses = useSelector((state) => state.tenses);
	const pronouns = useSelector((state) => state.pronouns);
	const verbSettings = useSelector((state) => state.verbSettings);
	const currentQuestion = useSelector((state) => state.currentQuestion);
	const targetScore = useSelector((state) => state.targetScore);
	const currentScore = useSelector((state) => state.score);
	const userAnswer = useSelector((state) => state.userAnswer);
	const dispatch = useDispatch();

	// An array of characters with accents that will be used with buttons on the form.
	const specialCharacters = ['á', 'é', 'í', 'ó', 'ú', 'ñ'];

	const specialCharacterClick = (evt) => {
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
		// Check if the answer is correct.
		console.log(userAnswer);
		if (currentQuestion.answers.includes(userAnswer)) {
			// TODO: The answer is correct. Give feedback to the user.
			

			// Check if this is the last question.
			if (currentQuestion.questionNumber === targetScore) {
				// TODO: The game is finished, so review performance.
                
                
			} else {
                // Increase the score and generate a new question.
                setTimeout(() => {                     
                    dispatch(setScore(currentScore + 1));
                    generateNextQuestion();
                 }, 3000);

				
			}
		} else {
			// TODO: The answer is incorrect. Give feedback to the user.
			
            
		}
	}

	function generateNextQuestion() {
		const nextQuestion = generateQuestion(tenses, pronouns, verbSettings);
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

	return (
		<div className="game-container">
			<div className="nav-button">
				<Link to="/"> Back </Link>
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
