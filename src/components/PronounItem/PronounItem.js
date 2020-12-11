import React from 'react';
import './PronounItem.css';

export default function PronounItem(props) {
	return (
		<div className="pronoun">
			<label className="checkbox-container">
				{props.name}
				<input
					type="checkbox"
					defaultChecked={props.selected}
					onChange={props.onClick}
				/>
				<span className="checkmark"></span>
			</label>
		</div>
	);
}
