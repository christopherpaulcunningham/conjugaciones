import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { toggleCurrentlyPlaying } from '../../actions/gameActions';

import Loading from '../Loading/Loading';
import ReviewQuestion from '../ReviewQuestion/ReviewQuestion';
import './Feedback.css';

const Feedback = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const isLoading = useSelector((state) => state.isLoading);
	const score = useSelector((state) => state.score);
	const targetScore = useSelector((state) => state.targetScore);
	const questionList = useSelector((state) => state.questionList);
	const answerList = useSelector((state) => state.answerList);

	function handleClick() {
		dispatch(toggleCurrentlyPlaying());
		history.push('/');
	}

	const finalScore = ((score / targetScore) * 100);

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
				<button id="btn-finish" className="btn-finish" onClick={handleClick}>
					{displayLanguage === 'ENG' ? 'FINISH' : 'FINALIZAR'}
				</button>
			</div>
		</div>
	);
};

export default Feedback;
