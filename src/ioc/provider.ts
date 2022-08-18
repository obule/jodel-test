import { AnswerService } from '@/contracts/service/answer';
import { SurveyService } from '@/contracts/service/survey';
import { SQLAnswerRepository } from '@/repository/answer';
import { SQLSurveyRepository } from '@/repository/survey';
import { AuthorizingAnswerService } from '@/services/answer';
import { AuthorizingSurveyService } from '@/services/survey';

export interface IProvider {
  getSurveyService(): SurveyService;
  getAnswerService(): AnswerService;
}

class DefaultProvider implements IProvider {
  public getAnswerService(): AnswerService {
    const answerRepository = new SQLAnswerRepository();
    const surveyRepository = new SQLSurveyRepository();
    return new AuthorizingAnswerService(answerRepository, surveyRepository);
  }

  public getSurveyService(): SurveyService {
    const repository = new SQLSurveyRepository();
    return new AuthorizingSurveyService(repository);
  }
}

let provider: IProvider = new DefaultProvider();

export function getSurveyService(): SurveyService {
  return provider.getSurveyService();
}

export function getAnswerService(): AnswerService {
  return provider.getAnswerService();
}

export function setProvider(newProvider: IProvider): void {
  provider = newProvider;
}

export function getProvider(): IProvider {
  return provider;
}
