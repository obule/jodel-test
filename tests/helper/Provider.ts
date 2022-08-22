import { Answer } from '@/contracts/repository/answer';
import { Survey } from '@/contracts/repository/survey';
import { AnswerService } from '@/contracts/service/answer';
import { SurveyService } from '@/contracts/service/survey';
import { IProvider } from '@/ioc/provider';

import { ANSWER_DATA } from './data/answer';
import { SURVEY_DATA } from './data/survey';

export default class TestProvider implements IProvider {
  private surveyService: SurveyService;

  private answerService: AnswerService;

  public constructor($surveyService: SurveyService, $answerService: AnswerService) {
    this.surveyService = $surveyService;
    this.answerService = $answerService;
  }

  public getAnswerService(): AnswerService {
    return this.answerService;
  }

  public getSurveyService(): SurveyService {
    return this.surveyService;
  }
}

class StubSurveyService implements SurveyService {
  public create(): Survey {
    return SURVEY_DATA;
  }
}

class StubAnswerService implements AnswerService {
  public findAll(): Answer[] {
    return [ANSWER_DATA];
  }

  public create(): Answer[] {
    return [ANSWER_DATA];
  }
}

export function StubProvider(): IProvider {
  return new TestProvider(new StubSurveyService(), new StubAnswerService());
}
