import React from 'react';
import checkAccentError from '../../utils/checkAccentError';
import incorrectIcon from '../../resources/incorrect-icon.png';
import correctIcon from '../../resources/correct-icon.png';
import "./ReviewQuestion.css"

function ReviewQuestion(props) {
    const currentQuestion = props.question;
    const userAnswer = props.userAnswer.answer;
    const correctAnswers = props.question.answers;
    const questionNumber = currentQuestion.questionNumber;
    const verb = currentQuestion.verb.infinitive;
    const tense = currentQuestion.tense;
    const pronoun = currentQuestion.pronoun;
    let validationClass = "review-correct-answer";

    if(!correctAnswers.includes(userAnswer) && !checkAccentError(currentQuestion.answers, userAnswer)){
        validationClass = "review-incorrect-answer"
    }

    return (
        <div className={'review-performance ' + validationClass}>
            <div className="review-image">
                <img
                    src={validationClass === "review-correct-answer" ? correctIcon : incorrectIcon}
                    alt="Validation icon."
                ></img>
            </div>
            <div id="review-question" className={validationClass}>
                <p><strong>{questionNumber}. {verb} - {tense}, {pronoun} </strong></p>
                <p className="question-answers">Correct answer(s): {correctAnswers.join(", ")} </p>
                <p className="question-answers">Your answer: {userAnswer} </p>
            </div>    
        </div>
    )
}

export default ReviewQuestion
