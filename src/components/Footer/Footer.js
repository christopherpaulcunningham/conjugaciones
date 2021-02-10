import React from 'react';

import githubLogo from "../../assets/images/github.png";
import './Footer.css';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<div className="footer">
			
			<div className="copyright">Christopher Cunningham © {currentYear}</div>
			<a
				href="https://github.com/christopherpaulcunningham/conjugaciones"
				target="_blank" rel="noreferrer"
				className="footer-logo"
			>
				<img src={githubLogo} alt="github logo" />
			</a>
		</div>
	);
};

export default Footer;
