import {
  Answer,
  CreateAnswerVars as RepoCreateAnswerVars,
  FindAllAnswerArgs as RepoFindAllAnswerArgs,
} from '../repository/answer';

export type AnswerVars = Omit<RepoCreateAnswerVars, 'surveyId'>;

export type CreateAnswerVars = {
  surveyId: string;
  answers: AnswerVars[];
};
export type FindAllAnswerArgs = RepoFindAllAnswerArgs;

export interface AnswerService {
  findAll(args: FindAllAnswerArgs): Answer[];
  create(vars: CreateAnswerVars): Answer[];
}
