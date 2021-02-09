import React from 'react';
import { useSelector } from 'react-redux';
import './TenseItem.css';

export default function TenseItem(props) {
	const displayLanguage = useSelector((state) => state.displayLanguage);

	return (
		<div className="tense-item-container">
			<label className="tense-item">
				{displayLanguage === 'ENG' ? props.name : props.nameESP}
				<input
					className="tense-item-checkbox"
					type="checkbox"
					defaultChecked={props.selected}
					onChange={props.onClick}
				/>
				<span className="checkmark"></span>
				<div className="example">
					{displayLanguage === 'ENG' ? 'e.g. ' : 'p. ej. '}
					{props.example}
				</div>
			</label>
		</div>
	);
}
