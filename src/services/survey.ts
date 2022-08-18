import { Survey, SurveyRepository } from '@/contracts/repository/survey';
import { CreateSurveyVars, SurveyService } from '@/contracts/service/survey';

export class AuthorizingSurveyService implements SurveyService {
  public constructor(private surveyRepository: SurveyRepository) {}

  public create(vars: CreateSurveyVars): Survey {
    return this.surveyRepository.create(vars);
  }
}
