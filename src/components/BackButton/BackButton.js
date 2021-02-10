import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

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

	const handleBackClick = () => {
		// End the game and redirect.
		resetGame();
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
			<Link to="/">
				<input
					id="btn-previous"
					type="image"
					src={previousIcon}
					onClick={() => {
						if (
							window.confirm(
								props.displayLanguage === 'ENG'
									? 'Are you sure you wish to exit the game?'
									: '¿Estás seguro de que quieres terminar el juego?'
							)
						)
							handleBackClick();
					}}
					alt="Quit game"
				/>
			</Link>
		</div>
	);
};

export default BackButton;
