import React from 'react';
import VerbSelection from '../VerbSelection/VerbSelection';
import VerbSettings from '../VerbSettings/VerbSettings';
import './Options.css';

export default function Options() {
	return (
		<div className="options-container">
			<VerbSelection />
			<VerbSettings />
		</div>
	);
}
