import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTense } from '../../actions';
import TenseItem from '../TenseItem/TenseItem';
import warningIcon from '../../resources/exclamation.png';
import './VerbSelection.css';

export default function VerbSelection() {
	const tenses = useSelector((state) => state.tenses);
	const errors = useSelector((state) => state.errors);
	const dispatch = useDispatch();

	return (
		<div className="settings-container">
			<div className="settings-title">Tenses and Moods</div>
			<div className="section">
				{/* <p className="help-text">(Hover over the tense for more information)</p> */}
				{errors['tenses'] !== undefined && (
					<div className="validation-message">
						<img class="warning-image" src={warningIcon} alt="warning"></img>
						<span>{errors['tenses']}</span>
					</div>
				)}
				<div className="left-section">
					<div className="section-header">Indicative</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Indicative')
							.map((tense) => (
								<TenseItem
									key={tense.tense}
									id={tense.tense}
									name={tense.name}
									selected={tense.selected}
									example={tense.example}
									onClick={() => dispatch(toggleTense(tense))}
								/>
							))}
					</div>
					<div className="section-header">Subjunctive</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Subjunctive')
							.map((tense) => (
								<div key={tense.tense}>
									<TenseItem
										key={tense.tense}
										id={tense.tense}
										name={tense.name}
										selected={tense.selected}
										example={tense.example}
										onClick={() => dispatch(toggleTense(tense))}
									/>
								</div>
							))}
					</div>
					<div className="section-header">Continuous</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Continuous')
							.map((tense) => (
								<div key={tense.tense}>
									<TenseItem
										key={tense.tense}
										id={tense.tense}
										name={tense.name}
										selected={tense.selected}
										example={tense.example}
										onClick={() => dispatch(toggleTense(tense))}
									/>
								</div>
							))}
					</div>
					{/* <div className="section-header">Imperative</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Imperative')
							.map((tense) => (
								<div key={tense.tense}>
									<TenseItem
										key={tense.tense}
										id={tense.tense}
										name={tense.name}
										selected={tense.selected}
										example={tense.example}
										onClick={() => dispatch(toggleTense(tense))}
									/>
								</div>
							))}
					</div> */}
				</div>
				<div className="right-section">
					{/* <div className="section-header">Continuous (Progressive)</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Continuous')
							.map((tense) => (
								<div key={tense.tense}>
									<TenseItem
										key={tense.tense}
										id={tense.tense}
										name={tense.name}
										selected={tense.selected}
										example={tense.example}
										onClick={() => dispatch(toggleTense(tense))}
									/>
								</div>
							))}
					</div> */}
					<div className="section-header">Imperative</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Imperative')
							.map((tense) => (
								<div key={tense.tense}>
									<TenseItem
										key={tense.tense}
										id={tense.tense}
										name={tense.name}
										selected={tense.selected}
										example={tense.example}
										onClick={() => dispatch(toggleTense(tense))}
									/>
								</div>
							))}
					</div>
					<div className="section-header">Perfect</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Perfect')
							.map((tense) => (
								<div key={tense.tense}>
									<TenseItem
										key={tense.tense}
										id={tense.tense}
										name={tense.name}
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
