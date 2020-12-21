import React from 'react';
import { useSelector } from 'react-redux';
import './TenseItem.css';

export default function TenseItem(props) {
	const displayLanguage = useSelector((state) => state.displayLanguage);

	console.log(props.id);
	return (
		<div>
			<label className="checkbox-container">
				{displayLanguage === 'ENG' ? props.name : props.nameESP}
				<input
					type="checkbox"
					defaultChecked={props.selected}
					onChange={props.onClick}
				/>
				<span className="checkmark"></span>
			</label>
			<div className="example">
				{displayLanguage === 'ENG' ? 'e.g. ' : 'p. ej. '}
				{props.example}
			</div>
		</div>
	);
}
