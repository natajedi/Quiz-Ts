import { IAnswer, IQuestion } from '../models/QuestionModel';
/*import { IUserSelected } from '../models/AnswerModel';*/
import { QuizSessionModel } from '../models/QuizSessionModel';

export class UIService {
 static updateQuestionText(question: import("../models/QuestionModel").QuestionModel | null) {
   throw new Error('Method not implemented.');
 }
 static displayPossibleAnswers(question: import("../models/QuestionModel").QuestionModel | null) {
   throw new Error('Method not implemented.');
 }
 static updateScore(session: QuizSessionModel) {
   throw new Error('Method not implemented.');
 }
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
    button.dataset.questionId = question.id.toString();
    button.addEventListener('click', this.selectAnswer);
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

 public async selectAnswer(event: Event) {
  const target = event.target as HTMLButtonElement;
  const answerId = Number(target.dataset.id);
  const questionId = Number(target.dataset.questionId);
 
  // Получить все вопросы из db.json
  const response = await fetch('./db.json');
  const data: { questions: IQuestion[] } = await response.json();
  const questions = data.questions;
 
  // Найти вопрос по ID
  const question = questions.find((q: IQuestion) => q.id === questionId);
  if (!question) {
  throw new Error(`Question with id ${questionId} not found`);
  }
 
  // Найти правильный ответ для этого вопроса
  const correctAnswer = question.answers.find((a: IAnswer) => a.correct);
  if (!correctAnswer) {
  throw new Error(`No correct answer found for question ${questionId}`);
  }
 
  const correctAnswerId = correctAnswer.id;
  if (answerId === correctAnswerId) {
  console.log('Пользователь ответил правильно!');
  } else {
  console.log('Пользователь ответил неправильно. Правильный ответ: ', correctAnswerId);
  }
 }
} 