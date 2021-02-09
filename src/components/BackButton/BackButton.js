import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleCurrentlyPlaying } from '../../actions/gameActions';
import previousIcon from '../../assets/images/previous.png';
import './BackButton.css';

const BackButton = (props) => {
	const dispatch = useDispatch();

	const handleBackClick = () => {
		// End the game and redirect.
		dispatch(toggleCurrentlyPlaying());
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
