import { CreateSurveyVars as RepoCreateSurveyVars, Survey } from '@/contracts/repository/survey';

export type CreateSurveyVars = Omit<RepoCreateSurveyVars, 'createdAt'>;

export interface SurveyService {
  create(vars: CreateSurveyVars): Survey;
}
