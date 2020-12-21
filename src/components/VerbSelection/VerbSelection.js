import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTense } from '../../actions';
import TenseItem from '../TenseItem/TenseItem';
import warningIcon from '../../resources/exclamation.png';
import './VerbSelection.css';

export default function VerbSelection() {
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const tenses = useSelector((state) => state.tenses);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();
	return (
		<div className="settings-container">
			<div className="settings-title">
				{displayLanguage === 'ENG' ? 'Tenses and Moods' : 'Tiempos y Modos'}
			</div>
			<div className="section">
				{errors['tenses'] !== undefined && (
					<div className="validation-message">
						<img
							className="warning-image"
							src={warningIcon}
							alt="warning"
						></img>
						<span>{errors['tenses']}</span>
					</div>
				)}
				<div className="left-section">
					<div className="section-header">
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
					<div className="section-header">
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
					<div className="section-header">
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
					<div className="section-header">
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
					<div className="section-header">
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
		</div>
	);
}
