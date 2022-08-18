export enum QuestionType {
  Boolean = 'Boolean',
  MultiChoice = 'MultiChoice',
}

export type Question = {
  questionType: QuestionType;
  question: string;
  answer: string[];
};

export type QuestionEntity = Question & {
  id: string;
  surveyId: string;
};

export type Survey = {
  id: string;
  name: string;
  createdAt: Date;
  description?: string;
  questions: QuestionEntity[];
};

export type CreateSurveyVars = {
  name: string;
  description?: string;
  questions: Question[];
};

export interface SurveyRepository {
  create(vars: CreateSurveyVars): Survey;
  findByIdOrFail(surveyId: string): QuestionEntity[];
}
