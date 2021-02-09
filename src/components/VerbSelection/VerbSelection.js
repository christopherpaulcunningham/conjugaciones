import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toggleTense } from '../../actions/gameActions';
import TenseItem from '../TenseItem/TenseItem';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import './VerbSelection.css';

const VerbSelection = () => {
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const tenses = useSelector((state) => state.tenses);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();

	return (
		<div className="selection-container">
			<h2 className="selection-header">
				{displayLanguage === 'ENG' ? 'Tenses and Moods' : 'Tiempos y Modos'}
			</h2>
			{errors['tenses'] !== undefined && (
				<div className="selection-error"><ErrorMessage message={errors['tenses']} /></div>				
			)}
			<div className="left-section">
				<div className="selection-section-header">
					{displayLanguage === 'ENG' ? 'Indicative' : 'Indicativo'}
				</div>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === 'Indicative')
						.map((tense) => (
							<TenseItem
								key={tense.id}
								id={tense.id}
								name={tense.name}
								nameESP={tense.nameESP}
								selected={tense.selected}
								example={tense.example}
								onClick={() => dispatch(toggleTense(tense))}
							/>
						))}
				</div>
				<div className="selection-section-header">
					{displayLanguage === 'ENG' ? 'Subjunctive' : 'Subjuntivo'}
				</div>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === 'Subjunctive')
						.map((tense) => (
							<div key={tense.tense}>
								<TenseItem
									key={tense.id}
									id={tense.id}
									name={tense.name}
									nameESP={tense.nameESP}
									selected={tense.selected}
									example={tense.example}
									onClick={() => dispatch(toggleTense(tense))}
								/>
							</div>
						))}
				</div>
				<div className="selection-section-header">
					{displayLanguage === 'ENG' ? 'Continuous' : 'Continuo'}
				</div>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === 'Continuous')
						.map((tense) => (
							<div key={tense.tense}>
								<TenseItem
									key={tense.id}
									id={tense.id}
									name={tense.name}
									nameESP={tense.nameESP}
									selected={tense.selected}
									example={tense.example}
									onClick={() => dispatch(toggleTense(tense))}
								/>
							</div>
						))}
				</div>
			</div>
			<div className="right-section">
				<div className="selection-section-header">
					{displayLanguage === 'ENG' ? 'Imperative' : 'Imperativo'}
				</div>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === 'Imperative')
						.map((tense) => (
							<div key={tense.tense}>
								<TenseItem
									key={tense.id}
									id={tense.id}
									name={tense.name}
									nameESP={tense.nameESP}
									selected={tense.selected}
									example={tense.example}
									onClick={() => dispatch(toggleTense(tense))}
								/>
							</div>
						))}
				</div>
				<div className="selection-section-header">
					{displayLanguage === 'ENG' ? 'Perfect' : 'Perfecto'}
				</div>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === 'Perfect')
						.map((tense) => (
							<div key={tense.tense}>
								<TenseItem
									key={tense.id}
									id={tense.id}
									name={tense.name}
									nameESP={tense.nameESP}
									selected={tense.selected}
									example={tense.example}
									onClick={() => dispatch(toggleTense(tense))}
								/>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default VerbSelection;
