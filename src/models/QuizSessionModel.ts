import { IQuestion } from './QuestionModel';

export class QuizSessionModel {
 currentQuestionIndex: number;
 selectedAnswerIds: number[];
 score: number;
 currentQuestion: IQuestion | null;

 constructor(currentQuestionIndex: number, selectedAnswerIds: number[], score: number, currentQuestion: IQuestion | null) {
    this.currentQuestionIndex = currentQuestionIndex;
    this.selectedAnswerIds = selectedAnswerIds;
    this.score = score;
    this.currentQuestion = currentQuestion;
 }
}


