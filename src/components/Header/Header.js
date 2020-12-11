import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisplayLanguage } from '../../actions';
import './Header.css';
import spanishFlag from '../../resources/spain-flag.png';
import britishFlag from '../../resources/british-flag.png';

export default function Header() {
	const dispatch = useDispatch();
	const displayLanguage = useSelector((state) => state.displayLanguage);

	return (
		<nav className="header">
			<div className="title">
				<span className="home-link no-select">conjugaciones</span>
			</div>
			<ul className="nav-menu">
				<li className="nav-item">
					{displayLanguage === 'ENG' && (
						<img
							className="flag"
							src={spanishFlag}
							alt="Spanish flag"
							onClick={() => dispatch(setDisplayLanguage('ESP'))}
						></img>
					)}
					{displayLanguage === 'ESP' && (
						<img
							className="flag"
							src={britishFlag}
							alt="English flag"
							onClick={() => dispatch(setDisplayLanguage('ENG'))}
						></img>
					)}
				</li>
			</ul>
		</nav>
	);
}
