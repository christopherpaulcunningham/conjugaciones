import React from 'react';

import './RadioButton.css';

const RadioButton = (props) => {
	return (
		<label className="radio-container">
			{props.name}
			<input id={props.id} type="radio" checked={props.checked} onChange={props.onChange} />
			<span className="radio-checkmark"></span>
		</label>
	);
};

export default RadioButton;
