import React from 'react';
import { useSelector } from 'react-redux';
import capitaliseFirstLetterOfEachWord from '../../utils/capitaliseFirstLetterOfEachWord';
import checkAccentError from '../../utils/checkAccentError';
import incorrectIcon from '../../resources/incorrect-icon.png';
import correctIcon from '../../resources/correct-icon.png';
import './ReviewQuestion.css';

function ReviewQuestion(props) {
	// Get the current display language.
	const displayLanguage = useSelector((state) => state.displayLanguage);
	const selectedTenses = useSelector((state) => state.tenses);
	const currentQuestion = props.question;

	console.log(props.userAnswer);

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
			<div className="review-image">
				<img
					src={
						validationClass === 'review-correct-answer'
							? correctIcon
							: incorrectIcon
					}
					alt="Validation icon."
				></img>
			</div>
			<div id="review-question" className={validationClass}>
				<p>
					<strong>
						{questionNumber}. {verb} -{' '}
						{displayLanguage === 'ENG'
							? tense
							: selectedTenses.filter(
									(tense) => tense.tense === currentQuestion.tense
							  )[0].tenseESP}
						{', '}
						{capitaliseFirstLetterOfEachWord(pronoun)}{' '}
					</strong>
				</p>
				<p className="question-answers">
					{displayLanguage === 'ENG'
						? 'Correct solution(s): '
						: 'Solucion(es) correcta(s): '}
					{correctAnswers.join(', ')}
				</p>
				<p className="question-answers">
					{displayLanguage === 'ENG' ? 'Your answer: ' : 'Tu respuesta: '}
					{userAnswer}
				</p>
			</div>
		</div>
	);
}

export default ReviewQuestion;
