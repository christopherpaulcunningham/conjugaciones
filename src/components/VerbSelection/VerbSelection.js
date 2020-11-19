import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTense } from "../../actions";
import TenseItem from "../TenseItem/TenseItem";
import "./VerbSelection.css";

export default function VerbSelection() {
	const tenses = useSelector((state) => state.tenses);
	const dispatch = useDispatch();

	return (
		<div className="settings-column" id="selection-column">
			<div className="column-header">Tenses and Moods</div>
			<p className="help-text">(Hover over the tense for more information)</p>
			<div className="validation-message">
			{tenses.every((tense) => !tense.selected) && (
				<span>* Select at least one tense.</span>
			)}
			</div>
			<div className="options-section-left">
				<span className="section-header">Indicative</span>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === "indicative")
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
				<span className="section-header">Subjunctive</span>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === "subjunctive")
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
				<span className="section-header">Imperative</span>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === "imperative")
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
			<div className="options-section-left">
				<span className="section-header">Continuous (Progressive)</span>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === "continuous")
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
				<span className="section-header">Perfect</span>
				<div className="options-section">
					{tenses
						.filter((tense) => tense.category === "perfect")
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
	);
}
