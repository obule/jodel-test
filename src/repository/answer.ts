import { v4 as uuidv4 } from 'uuid';

import {
  Answer,
  AnswerRepository,
  CreateAnswerVars,
  FindAllAnswerArgs,
} from '@/contracts/repository/answer';

export const AnswerDataStore: Answer[] = [];

export class SQLAnswerRepository implements AnswerRepository {
  public findAll(args: FindAllAnswerArgs): Answer[] {
    const { surveyId } = args;
    return AnswerDataStore.filter((answer) => answer.surveyId === surveyId);
  }

  public create(vars: CreateAnswerVars): Answer {
    const answer: Answer = { ...vars, id: uuidv4(), createdAt: new Date() };
    AnswerDataStore.push(answer);
    return answer;
  }
}
