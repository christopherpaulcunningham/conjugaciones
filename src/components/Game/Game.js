import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUserAnswer } from '../../actions';
import './Game.css';

export default function Game() {
	const currentQuestion = useSelector((state) => state.currentQuestion);
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
					<input id="answer-input" value={userAnswer} onChange={(event) => dispatch(setUserAnswer(event.target.value))} />
					<div className="button-container">
						{specialCharacters.map((character) => (
							<button onClick={specialCharacterClick} value={character}>
								{character}
							</button>
						))}
					</div>
				</div>
			</div>
			<button id="btn-submit">Submit</button>
		</div>
	);
}
