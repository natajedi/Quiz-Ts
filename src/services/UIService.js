"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIService = void 0;
class UIService {
    static updateQuestionText(question) {
        const questionElement = document.querySelector('#question-text');
        if (question) {
            questionElement.innerHTML = `${question.id}. ${question.text}`;
        }
        else {
            questionElement.innerHTML = '';
        }
    }
    static displayPossibleAnswers(question) {
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
    static updateScore(session) {
        const scoreElement = document.querySelector('#score');
        scoreElement.innerHTML = `Your score: ${session.score}`;
    }
    selectAnswer(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = event.target;
            const answerId = Number(target.dataset.id);
            const questionId = Number(target.dataset.questionId);
            // Получить все вопросы из db.json
            const response = yield fetch('./db.json');
            const data = yield response.json();
            const questions = data.questions;
            // Найти вопрос по ID
            const question = questions.find((q) => q.id === questionId);
            if (!question) {
                throw new Error(`Question with id ${questionId} not found`);
            }
            // Найти правильный ответ для этого вопроса
            const correctAnswer = question.answers.find((a) => a.correct);
            if (!correctAnswer) {
                throw new Error(`No correct answer found for question ${questionId}`);
            }
            const correctAnswerId = correctAnswer.id;
            if (answerId === correctAnswerId) {
                console.log('Пользователь ответил правильно!');
            }
            else {
                console.log('Пользователь ответил неправильно. Правильный ответ: ', correctAnswerId);
            }
        });
    }
}
exports.UIService = UIService;
