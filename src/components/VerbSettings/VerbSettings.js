import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	togglePronoun,
	setIrregularVerbs,
	setReflexiveVerbs,
	setSelectedVerbs,
	setUserDefinedVerbs,
} from '../../actions';
import PronounItem from '../PronounItem/PronounItem';
import './VerbSettings.css';

export default function VerbSettings() {
	const tenses = useSelector((state) => state.tenses);
	const pronouns = useSelector((state) => state.pronouns);
	const verbSettings = useSelector((state) => state.verbSettings);
	const tenseError = tenses.every((tenseObj) => !tenseObj.selected);
	const pronounsError = pronouns.every((pronounObj) => !pronounObj.selected);
	const verbsError =
		verbSettings.selectedVerbs === 'USER_DEFINED' &&
		verbSettings.userDefinedVerbs === '';

	const dispatch = useDispatch();

	return (
		<div className="settings-column" id="settings-column">
			<div className="column-header">Additional Settings</div>
			<div className="validation-message">
				{pronouns.every((pronoun) => !pronoun.selected) && (
					<span>* Select at least one pronoun.</span>
				)}
			</div>
			<span className="section-header">Pronouns</span>
			<div className="settings-section">
				{pronouns.map((pronoun) => (
					<PronounItem
						key={pronoun.pronoun}
						id={pronoun.pronoun}
						name={pronoun.name}
						selected={pronoun.selected}
						onClick={() => dispatch(togglePronoun(pronoun))}
					/>
				))}
			</div>
			<span className="section-header">Verb Types</span>
			<div className="settings-section">
				<span>Irregular Verbs</span>
				<div className="btn-group">
					<input
						key={1}
						type="radio"
						id="irregular-include"
						checked={verbSettings.irregularVerbs === 'INCLUDE'}
						onClick={() => dispatch(setIrregularVerbs('INCLUDE'))}
					/>
					<label>Include</label>
					<input
						key={2}
						type="radio"
						id="irregular-exclude"
						checked={verbSettings.irregularVerbs === 'EXCLUDE'}
						onClick={() => dispatch(setIrregularVerbs('EXCLUDE'))}
					/>
					<label>Exclude</label>
				</div>
			</div>
			<div className="settings-section">
				<span>Reflexive Verbs</span>
				<div className="btn-group">
					<input
						key={3}
						type="radio"
						id="reflexive-include"
						checked={verbSettings.reflexiveVerbs === 'INCLUDE'}
						onClick={() => dispatch(setReflexiveVerbs('INCLUDE'))}
					/>
					<label>Include</label>
					<input
						key={4}
						type="radio"
						id="reflexive-exclude"
						checked={verbSettings.reflexiveVerbs === 'EXCLUDE'}
						onClick={() => dispatch(setReflexiveVerbs('EXCLUDE'))}
					/>
					<label>Exclude</label>
				</div>
			</div>
			<div className="settings-section">
				<span>Verbs To Use</span>
				<div className="btn-group">
					<input
						key={5}
						type="radio"
						id="verbs-all"
						checked={verbSettings.selectedVerbs === 'ALL'}
						onClick={() => dispatch(setSelectedVerbs('ALL'))}
					/>
					<label onClick={() => dispatch(setSelectedVerbs('ALL'))}>All</label>
					<input
						key={6}
						type="radio"
						id="verbs-common"
						checked={verbSettings.selectedVerbs === 'COMMON'}
						onClick={() => dispatch(setSelectedVerbs('COMMON'))}
					/>
					<label onClick={() => dispatch(setSelectedVerbs('COMMON'))}>
						The most common
					</label>
					<input
						key={7}
						type="radio"
						id="verbs-user-defined"
						checked={verbSettings.selectedVerbs === 'USER_DEFINED'}
						onClick={() => dispatch(setSelectedVerbs('USER_DEFINED'))}
					/>
					<label onClick={() => dispatch(setSelectedVerbs('USER_DEFINED'))}>
						The following:
					</label>
					<div className="validation-message">
						{verbSettings.selectedVerbs === 'USER_DEFINED' &&
							verbSettings.userDefinedVerbs === '' && (
								<span>* Enter some verbs.</span>
							)}
					</div>
					<input
						id="custom-verbs"
						value={verbSettings.userDefinedVerbs}
						onChange={(evt) => dispatch(setUserDefinedVerbs(evt.target.value))}
						placeholder="Enter some verbs to practice.."
					></input>
				</div>
				<div className="button-section">
					<button
						type="submit"
						id="btn-start"
						disabled={tenseError || pronounsError || verbsError}>
						Start
					</button>
					{(tenseError || pronounsError || verbsError) && (
						<div id="button-message">Please resolve errors to continue.</div>
					)}
				</div>
			</div>
		</div>
	);
}
