import React from 'react';
import './ProgressBar.css';

const Filler = (props) => {
	return <div className="filler" style={{ width: `${props.percentage}%` }} />;
};

export default function ProgressBar(props) {
	const currentQuestion = props.currentQuestion.questionNumber;
    const numQuestions = props.targetScore;
    const percentage = ((currentQuestion / numQuestions) * 100) - 10;

	return (
		<div className="progress-bar">
			<Filler percentage={percentage} />
		</div>
	);
}
