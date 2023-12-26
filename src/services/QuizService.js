"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const QuizSessionModel_1 = require("../models/QuizSessionModel");
class QuizService {
    constructor(questions) {
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
        return new QuizSessionModel_1.QuizSessionModel(this.currentQuestionIndex, this.selectedAnswerIds, this.score, this.currentQuestion);
    }
    nextQuestion() {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        return new QuizSessionModel_1.QuizSessionModel(this.currentQuestionIndex, this.selectedAnswerIds, this.score, this.currentQuestion);
    }
    checkAnswer(session, answerId) {
        var _a;
        if (!session) {
            throw new Error('Session is null');
        }
        if (!session.currentQuestion) {
            throw new Error('Current question is null');
        }
        const isCorrect = session.currentQuestion.answers.some(answer => answer.id === answerId && answer.correct);
        const correctAnswerId = ((_a = session.currentQuestion.answers.find(answer => answer.correct)) === null || _a === void 0 ? void 0 : _a.id) || -1;
        return { isCorrect, correctAnswerId, session: new QuizSessionModel_1.QuizSessionModel(this.currentQuestionIndex, this.selectedAnswerIds, this.score, this.currentQuestion) };
    }
    calculateResult(answers) {
        const correctAnswersCount = answers.reduce((count, answer) => { var _a, _b; return count + (((_b = (_a = this.questions.find(question => question.id === answer.questionId)) === null || _a === void 0 ? void 0 : _a.answers.find(a => a.id === answer.answerId)) === null || _b === void 0 ? void 0 : _b.correct) ? 1 : 0); }, 0);
        return { score: correctAnswersCount };
    }
}
exports.QuizService = QuizService;
