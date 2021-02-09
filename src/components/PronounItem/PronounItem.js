import React from 'react';
import './PronounItem.css';

export default function PronounItem(props) {
	return (
		<div className="pronoun-item-container">
			<label className="pronoun-item">
				{props.name}
				<input
					className="pronoun-item-checkbox"
					type="checkbox"
					defaultChecked={props.selected}
					onChange={props.onClick}
				/>
				<span className="checkmark"></span>
			</label>
		</div>
	);
}
