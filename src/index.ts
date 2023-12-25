import { QuizService } from './services/QuizService';
import { UIService } from './services/UIService';
import { QuestionModel } from './models/QuestionModel';
import { QuizSessionModel } from './models/QuizSessionModel';

let session: QuizSessionModel = new QuizSessionModel();
let question: QuestionModel | null = null;
let showNextQuestion: boolean = false;

fetch('./dbjson') 
 .then(response => response.json())
 .then(data => {
 const quizService = new QuizService(data.questions);

 document.getElementById("startButton")?.addEventListener("click", () => {
   session = quizService.startNewQuiz();
   question = session.currentQuestion;
   UIService.updateQuestionText(question);
   UIService.displayPossibleAnswers(question);
 });

 document.getElementById("nextButton")?.addEventListener("click", () => {
   session = quizService.nextQuestion();
   question = session.currentQuestion;
   UIService.updateQuestionText(question);
   UIService.displayPossibleAnswers(question);
   showNextQuestion = false;
 });

 document.querySelectorAll(".answer").forEach((element: Element) => {
   element.addEventListener("click", (event: Event) => {
     const answerElement = event.target as HTMLElement;
     const answerId = parseInt(answerElement.dataset.id || "");
     const result = quizService.checkAnswer(session, answerId);
     session = result.session;
     question = result.question;
     showNextQuestion = result.showNextQuestion;
     UIService.updateQuestionText(question);
     UIService.displayPossibleAnswers(question);
     UIService.updateScore(session);
   });
 });
 })
 .catch(error => console.error('Error:', error));



