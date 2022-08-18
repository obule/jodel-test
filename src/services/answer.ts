import {
  Answer,
  AnswerRepository,
  CreateAnswerVars,
  FindAllAnswerArgs,
} from '@/contracts/repository/answer';
import { SurveyRepository } from '@/contracts/repository/survey';
import { AnswerService } from '@/contracts/service/answer';

export class AuthorizingAnswerService implements AnswerService {
  public constructor(
    private answerRepository: AnswerRepository,
    private surveyRepository: SurveyRepository,
  ) {}

  public findAll(args: FindAllAnswerArgs): Answer[] {
    return this.answerRepository.findAll(args);
  }

  public create(vars: CreateAnswerVars): Answer {
    this.validateInput(vars);
    return this.answerRepository.create(vars);
  }

  private validateInput(vars: CreateAnswerVars): void {
    const { surveyId, questionId } = vars;
    const foundQuestions = this.surveyRepository.findByIdOrFail(surveyId);
    const foundQuestion = foundQuestions.find((question) => question.id === questionId);
    if (!foundQuestion) throw new Error(`Question with ${questionId} does not exist`);
  }
}
