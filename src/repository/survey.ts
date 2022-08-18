import { v4 as uuidv4 } from 'uuid';

import {
  CreateSurveyVars,
  QuestionEntity,
  Survey,
  SurveyRepository,
} from '@/contracts/repository/survey';

export const SurveyDataStore: Record<string, QuestionEntity[]> = {};

export class SQLSurveyRepository implements SurveyRepository {
  public findByIdOrFail(surveyId: string): QuestionEntity[] {
    const questions = SurveyDataStore[surveyId];
    if (!questions) throw new Error(`cannot find survey with id ${surveyId}`);

    return questions;
  }

  public create(vars: CreateSurveyVars): Survey {
    const { name, questions, description } = vars;
    const surveyId = uuidv4();
    const entityQuestion = questions.map<QuestionEntity>((question) => ({
      ...question,
      id: uuidv4(),
      surveyId,
    }));
    // Store data
    if (!SurveyDataStore[surveyId]) {
      SurveyDataStore[surveyId] = [];
    }
    SurveyDataStore[surveyId] = [...SurveyDataStore[surveyId], ...entityQuestion];

    return { name, description, questions: entityQuestion, id: surveyId, createdAt: new Date() };
  }
}
