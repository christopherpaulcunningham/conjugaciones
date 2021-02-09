import React from 'react';
import { useSelector } from 'react-redux';
import capitaliseFirstLetterOfEachWord from '../../utils/capitaliseFirstLetterOfEachWord';
import checkAccentError from '../../utils/checkAccentError';
import './ReviewQuestion.css';

function ReviewQuestion(props) {
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const selectedTenses = useSelector((state) => state.tenses);
	const currentQuestion = props.question;

	const userAnswer = props.userAnswer.answer;
	const correctAnswers = props.question.answers;
	const questionNumber = currentQuestion.questionNumber;
	const verb = currentQuestion.verb.infinitive;
	const tense = currentQuestion.tense;
	const pronoun = currentQuestion.pronoun;
	let validationClass = 'review-correct-answer';

	if (
		!correctAnswers.includes(userAnswer) &&
		!checkAccentError(currentQuestion.answers, userAnswer)
	) {
		validationClass = 'review-incorrect-answer';
	}

	return (
		<div className={'review-performance ' + validationClass}>
			<div id="review-question" className={validationClass}>
				<div className="number-column">{questionNumber}.</div>
				<div className="question-column">
					<span className="review-question-verb">{verb}</span>
					<span className="review-question-tense-pronoun">
						{displayLanguage === 'ENG'
							? tense
							: selectedTenses.filter(
									(tense) => tense.tense === currentQuestion.tense
							  )[0].tenseESP}
						{', '}
						{capitaliseFirstLetterOfEachWord(pronoun)}{' '}
					</span>
					<span className="question-answers">
						{displayLanguage === 'ENG'
							? 'Correct solution: '
							: 'Solucion correcta: '}
						{correctAnswers.join(', ')}
					</span>
					<span className="question-answers">
						{displayLanguage === 'ENG' ? 'Your answer: ' : 'Tu respuesta: '}
						{userAnswer}
					</span>
				</div>
			</div>
		</div>
	);
}

export default ReviewQuestion;
