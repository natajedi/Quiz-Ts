import { IAnswer, IQuestion } from '../models/QuestionModel';
/*import { IUserSelected } from '../models/AnswerModel';*/
import { QuizSessionModel } from '../models/QuizSessionModel';

export class UIService {
 static updateQuestionText(question: IQuestion | null) {
 const questionElement = document.querySelector<HTMLHeadingElement>('#question-text') as HTMLHeadingElement;
 if (question) {
  questionElement.innerHTML = `${question.id}. ${question.text}`;
 } else {
  questionElement.innerHTML = '';
 }
 }

 static displayPossibleAnswers(question: IQuestion | null) {
 if (!question) {
  return;
 }

 const answersContainer = document.getElementById('answer-buttons');
 if (!answersContainer) {
  return;
 }

 // Очищаем контейнер от предыдущих ответов
 answersContainer.innerHTML = '';

 // Добавляем новые ответы
 question.answers.forEach((answer, index) => {
   const button = document.createElement('button');
   button.innerText = answer.text;
   button.dataset.id = String(index); // сохраняем индекс ответа в dataset
   button.className = 'answer'; // добавляем класс для обработки кликов
   answersContainer.appendChild(button);
 });
 }

 static updateScore(session: QuizSessionModel) {
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
