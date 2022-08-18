import {
  Answer,
  CreateAnswerVars as RepoCreateAnswerVars,
  FindAllAnswerArgs as RepoFindAllAnswerArgs,
} from '../repository/answer';

export type CreateAnswerVars = RepoCreateAnswerVars;
export type FindAllAnswerArgs = RepoFindAllAnswerArgs;

export interface AnswerService {
  findAll(args: FindAllAnswerArgs): Answer[];
  create(vars: CreateAnswerVars): Answer;
}
