export type Answer = {
  id: string;
  questionId: string;
  surveyId: string;
  answer: string[];
  createdAt: Date;
};

export type CreateAnswerVars = {
  questionId: string;
  answer: string[];
};

export type FindAllAnswerArgs = {
  surveyId: string;
};

export interface AnswerRepository {
  findAll(args: FindAllAnswerArgs): Answer[];
  create(surveyId: string, vars: CreateAnswerVars[]): Answer[];
}
