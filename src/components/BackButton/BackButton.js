import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
	toggleCurrentlyPlaying,
	setUserAnswer,
	setAnswerList,
	setTargetScore,
	setScore,
} from '../../actions/gameActions';
import previousIcon from '../../assets/images/previous.png';
import './BackButton.css';

const BackButton = (props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleBackClick = () => {
		if (
			window.confirm(
				props.displayLanguage === 'ENG'
					? 'Are you sure you wish to exit the game?'
					: '¿Estás seguro de que quieres terminar el juego?'
			)
		) {
			// End the game and redirect.
			resetGame();
			history.push('/');
		}
	};

	const resetGame = () => {
		dispatch(toggleCurrentlyPlaying());
		dispatch(setUserAnswer(''));
		dispatch(setAnswerList([]));
		dispatch(setTargetScore(10));
		dispatch(setScore(0));
	};

	return (
		<div className="back-button-container">
			<input
				id="btn-previous"
				type="image"
				src={previousIcon}
				onClick={() => {
					handleBackClick();
				}}
				alt="Quit game"
			/>
		</div>
	);
};

export default BackButton;
