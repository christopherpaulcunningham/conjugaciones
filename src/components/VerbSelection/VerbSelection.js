import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTense } from '../../actions';
import TenseItem from '../TenseItem/TenseItem';
<<<<<<< HEAD
import warningIcon from '../../resources/exclamation.png';
=======
import warning from '../../resources/exclamation.png';
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
						<img class="warning-image" src={warningIcon} alt="warning"></img>
=======
						<img class="warning-image" src={warning} alt="warning"></img>
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
						<span>{errors['tenses']}</span>
					</div>
				)}
				<div className="left-section">
					<div className="section-header">Indicative</div>
					<div className="options-section">
						{tenses
<<<<<<< HEAD
							.filter((tense) => tense.category === 'Indicative')
=======
							.filter((tense) => tense.category === 'indicative')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
							.filter((tense) => tense.category === 'Subjunctive')
=======
							.filter((tense) => tense.category === 'subjunctive')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
					<div className="section-header">Continuous</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'Continuous')
=======
					<div className="section-header">Continuous (Progressive)</div>
					<div className="options-section">
						{tenses
							.filter((tense) => tense.category === 'continuous')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
							.filter((tense) => tense.category === 'Imperative')
=======
							.filter((tense) => tense.category === 'imperative')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
							.filter((tense) => tense.category === 'Continuous')
=======
							.filter((tense) => tense.category === 'continuous')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
							.filter((tense) => tense.category === 'Imperative')
=======
							.filter((tense) => tense.category === 'imperative')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
<<<<<<< HEAD
							.filter((tense) => tense.category === 'Perfect')
=======
							.filter((tense) => tense.category === 'perfect')
>>>>>>> 6b25ea3... Styling in progress - pushing for end of day
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
