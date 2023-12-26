"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuizService_1 = require("./services/QuizService");
const UIService_1 = require("./services/UIService");
const QuizSessionModel_1 = require("./models/QuizSessionModel");
let session = new QuizSessionModel_1.QuizSessionModel(0, [], 0, null);
let question = null;
let showNextQuestion = false;
fetch('./dbjson')
    .then(response => response.json())
    .then(data => {
    var _a, _b;
    const quizService = new QuizService_1.QuizService(data.questions);
    (_a = document.getElementById("startButton")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        session = quizService.startNewQuiz();
        question = session.currentQuestion;
        UIService_1.UIService.updateQuestionText(question);
        UIService_1.UIService.displayPossibleAnswers(question);
    });
    (_b = document.getElementById("nextButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
        session = quizService.nextQuestion();
        question = session.currentQuestion;
        UIService_1.UIService.updateQuestionText(question);
        UIService_1.UIService.displayPossibleAnswers(question);
        showNextQuestion = false;
    });
    document.querySelectorAll(".answer").forEach((element) => {
        element.addEventListener("click", (event) => {
            const answerElement = event.target;
            const answerId = parseInt(answerElement.dataset.id || "");
            const result = quizService.checkAnswer(session, answerId);
            session = result.session;
            question = result.session.currentQuestion;
            showNextQuestion = true;
            UIService_1.UIService.updateQuestionText(question);
            UIService_1.UIService.displayPossibleAnswers(question);
            UIService_1.UIService.updateScore(session);
        });
    });
})
    .catch(error => console.error('Error:', error));
