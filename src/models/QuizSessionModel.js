"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizSessionModel = void 0;
class QuizSessionModel {
    constructor(currentQuestionIndex, selectedAnswerIds, score, currentQuestion) {
        this.currentQuestionIndex = currentQuestionIndex;
        this.selectedAnswerIds = selectedAnswerIds;
        this.score = score;
        this.currentQuestion = currentQuestion;
    }
}
exports.QuizSessionModel = QuizSessionModel;
