import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleCurrentlyPlaying } from '../../actions';
import ReviewQuestion from '../ReviewQuestion/ReviewQuestion';
import './Feedback.css';

export default function Feedback() {
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const score = useSelector((state) => state.score);
	const targetScore = useSelector((state) => state.targetScore);
	const questionList = useSelector((state) => state.questionList);
	const answerList = useSelector((state) => state.answerList);
	const dispatch = useDispatch();
	const history = useHistory();

	function handleClick() {
		dispatch(toggleCurrentlyPlaying());
		history.push('/');
	}

	console.log(answerList);

	return (
		<div className="feedback-container">
			<div className="score-section">
				{displayLanguage === 'ENG' ? 'Your score is ' : 'Tu resultado es '}
				{score}/{targetScore}
			</div>
			<div>
				{questionList.map((question, index) => (
					<div className="review-question">
						<ReviewQuestion
							key={question.questionNumber}
							question={question}
							userAnswer={answerList[index]}
						/>
					</div>
				))}
			</div>
			<div className="button-section">
				<button id="btn-finish" onClick={handleClick}>
					{displayLanguage === 'ENG' ? 'FINISH' : 'FINALIZAR'}
				</button>
			</div>
		</div>
	);
}
