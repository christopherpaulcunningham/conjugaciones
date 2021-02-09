import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../Loading/Loading';
import VerbSelection from '../VerbSelection/VerbSelection';
import VerbSettings from '../VerbSettings/VerbSettings';
import './Options.css';

const Options = () => {
	const isLoading = useSelector((state) => state.isLoading);

	return (
		<div className="options-container">
			{isLoading && (
				<div className="loading-options">
					<Loading />
				</div>
			)}
			<VerbSelection />
			<hr className="horizontal-line" />
			<div className="vertical-line"></div>
			<VerbSettings />
		</div>
	);
};

export default Options;
