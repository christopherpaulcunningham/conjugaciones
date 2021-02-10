import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setDisplayLanguage, toggleIsLoading } from '../../actions/gameActions';
import logo from '../../assets/images/logo.png';
import spanishFlag from '../../assets/images/spain-flag.png';
import britishFlag from '../../assets/images/british-flag.png';
import './Header.css';

const Header = () => {
	const dispatch = useDispatch();
	const displayLanguage = useSelector((state) => state.displayLanguage);

	const changeLanguage = async () => {
		// Display a loading message when the user changes the language.
		dispatch(toggleIsLoading());
		if(displayLanguage === 'ENG'){
			dispatch(setDisplayLanguage('ESP'));
		}else{
			dispatch(setDisplayLanguage('ENG'));
		}
		await delay(500);
		dispatch(toggleIsLoading());
	}

	return (
		<nav className="header-container">
			<div className="header">
				<div className="header-title">
					<img src={logo} className="logo-img" alt="logo" />
					<span className="header-text">conjugaciones</span>
				</div>
				<ul className="nav-menu">
					<li className="nav-item">
						{displayLanguage === 'ENG' && (
							<img
								className="flag"
								src={britishFlag}
								alt="British flag"
								onClick={changeLanguage}
							></img>
						)}
						{displayLanguage === 'ESP' && (
							<img
								className="flag"
								src={spanishFlag}
								alt="Spanish flag"
								onClick={changeLanguage}
							></img>
						)}
					</li>
				</ul>
			</div>

			<div className="custom-shape-divider-bottom-1612454750">
				<svg
					data-name="Layer 1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 1200 120"
					preserveAspectRatio="none"
				>
					<path
						d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
						className="shape-fill"
					></path>
				</svg>
			</div>
		</nav>
	);
};

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export default Header;
