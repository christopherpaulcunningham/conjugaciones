import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
	toggleCurrentlyPlaying,
	setTargetScore,
	setScore,
} from '../../actions/gameActions';

import Loading from '../Loading/Loading';
import ReviewQuestion from '../ReviewQuestion/ReviewQuestion';
import './Feedback.css';

const Feedback = () => {
	const dispatch = useDispatch();
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const isLoading = useSelector((state) => state.isLoading);
	const score = useSelector((state) => state.score);
	const targetScore = useSelector((state) => state.targetScore);
	const questionList = useSelector((state) => state.questionList);
	const answerList = useSelector((state) => state.answerList);

	function handleClick() {
		// End the game and redirect.
		resetGame();
	}

	const resetGame = () => {
		dispatch(toggleCurrentlyPlaying());
		dispatch(setTargetScore(10));
		dispatch(setScore(0));
	};

	const finalScore = Math.floor((score / targetScore) * 100);

	return (
		<div className="feedback-container">
			{isLoading && (
				<div className="loading">
					<Loading />
				</div>
			)}
			<div className="score-section">
				{displayLanguage === 'ENG' ? 'Your score is: ' : 'Tu resultado es: '}
				{finalScore >= 70 ? (
					<span className="result pass">{finalScore}%</span>
				) : (
					<span className="result fail">{finalScore}%</span>
				)}
			</div>
			{questionList.map((question, index) => (
				<ReviewQuestion
					key={question.questionNumber}
					question={question}
					userAnswer={answerList[index]}
				/>
			))}
			<div className="flex-container"></div>
			<div className="button-section">
				<Link to="/">
					<button id="btn-finish" className="btn-finish" onClick={handleClick}>
						{displayLanguage === 'ENG' ? 'FINISH' : 'FINALIZAR'}
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Feedback;
