export interface IAnswer {
  correct: boolean;
  id: number;
  text: string;
  isCorrect: boolean;
 }
 
 export interface IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
 }
 
 export class QuestionModel implements IQuestion {
  id: number;
  text: string;
  answers: IAnswer[];
 
  constructor(id: number, text: string, answers: IAnswer[]) {
  this.id = id;
  this.text = text;
  this.answers = answers;
  }
 }
 
 