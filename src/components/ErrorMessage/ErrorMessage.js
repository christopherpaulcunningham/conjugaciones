import React from 'react';

import warningIcon from '../../assets/images/exclamation.png';
import './ErrorMessage.css';

const ErrorMessage = (props) => {
	return (
		<div className="error-message-container">
			<img className="warning-image" src={warningIcon} alt="warning"></img>
			<span className="error-text">{props.message}</span>
		</div>
	);
};

export default ErrorMessage;
