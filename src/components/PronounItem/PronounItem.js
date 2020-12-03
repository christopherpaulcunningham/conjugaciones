import React from 'react';
import './PronounItem.css';

export default function PronounItem(props) {
	return (
		<div className="pronoun">
			<input
				type="checkbox"
				defaultChecked={props.selected}
				onChange={props.onClick}
			/>
			<label htmlFor={props.id}>{props.name}</label>
		</div>
	);
}
