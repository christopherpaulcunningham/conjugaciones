// A function to check if the user's answer has a missing and/or extra accent, but is otherwise correct.
export default function checkAccentError(questionAnswers, userAnswer) {
    let accentError = false;

    // Format the user's answer and the question answer(s) to remove accents.
    const formattedUserAnswer = userAnswer
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const formattedQuestionAnswers = [];
    questionAnswers.forEach((answer) => {
        formattedQuestionAnswers.push(
            answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        );
    });

    if (formattedQuestionAnswers.includes(formattedUserAnswer)) {
        accentError = true;
    }

    return accentError;
}