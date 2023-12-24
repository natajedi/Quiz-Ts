import { IQuestion } from '../models/QuestionModel';
import { IUserSelectedAnswer } from '../models/AnswerModel';
import { QuizSessionModel } from '../models/QuizSessionModel';

export class QuizService {
 questions: IQuestion[];
 currentQuestionIndex: number;
 selectedAnswerIds: number[];
 score: number;
 currentQuestion: IQuestion | null;

 constructor(questions: IQuestion[]) {
   this.questions = questions;
   this.currentQuestionIndex = 0;
   this.selectedAnswerIds = [];
   this.score = 0;
   this.currentQuestion = this.questions[this.currentQuestionIndex];
 }

 startNewQuiz() {
   this.currentQuestionIndex = 0;
   this.selectedAnswerIds = [];
   this.score = 0;
   this.currentQuestion = this.questions[this.currentQuestionIndex];
   return new QuizSessionModel(this.currentQuestionIndex, this.selectedAnswerIds, this.score, this.currentQuestion);
 }

 nextQuestion() {
   this.currentQuestionIndex++;
   this.currentQuestion = this.questions[this.currentQuestionIndex];
   return new QuizSessionModel(this.currentQuestionIndex, this.selectedAnswerIds, this.score, this.currentQuestion);
 }

 checkAnswer(session: QuizSessionModel, answerId: number) {
   const isCorrect = session.currentQuestion.answers.some(answer => answer.id === answerId && answer.correct);
   const correctAnswerId = session.currentQuestion.answers.find(answer => answer.correct)?.id || -1;
   return { isCorrect, correctAnswerId, session: new QuizSessionModel(this.currentQuestionIndex, this.selectedAnswerIds, this.score, this.currentQuestion) };
 }

 calculateResult(answers: IUserSelectedAnswer[]) {
   const correctAnswersCount = answers.reduce((count, answer) => count + (this.questions.find(question => question.id === answer.questionId)?.answers.find(a => a.id === answer.answerId)?.correct ? 1 : 0), 0);
   return { score: correctAnswersCount };
 }
}

