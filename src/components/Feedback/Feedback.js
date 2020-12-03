import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleCurrentlyPlaying } from '../../actions';
import './Feedback.css';

export default function Feedback() {
	const score = useSelector((state) => state.score);
	const targetScore = useSelector((state) => state.targetScore);
	const dispatch = useDispatch();
	const history = useHistory();

	function handleClick() {
		dispatch(toggleCurrentlyPlaying());
		history.push('/');
	}

	return (
		<div className="feedback-container">
			Your score is {score} out of {targetScore}
			<button id="btn-finish" onClick={handleClick}>
				Finish
			</button>
		</div>
	);
}
