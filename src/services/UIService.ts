import { IQuestion } from './QuestionModel';
import { IUserSelectedAnswer } from './AnswerModel';

export class UIService {
 updateQuestionText(question: IQuestion | null) {
  const questionElement = document.querySelector<HTMLHeadingElement>('#question-text') as HTMLHeadingElement;
  if (question) {
    questionElement.innerHTML = `${question.id}. ${question.text}`;
  } else {
    questionElement.innerHTML = '';
  }
 }

 displayPossibleAnswers(question: IQuestion | null) {
  const answerButtonsContainer = document.querySelector<HTMLDivElement>('#answer-buttons') as HTMLDivElement;
  if (question) {
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerHTML = answer.text;
      button.type = 'button';
      button.classList.add('button', 'question__answer');
      button.dataset.id = answer.id.toString();
      button.addEventListener('click', selectAnswer);
      answerButtonsContainer.appendChild(button);
    });
  } else {
    while (answerButtonsContainer.firstChild) {
      answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }
  }
 }

 updateScore(session: QuizSessionModel) {
  const scoreElement = document.querySelector<HTMLParagraphElement>('#score') as HTMLParagraphElement;
  scoreElement.innerHTML = `Your score: ${session.score}`;
 }
}
