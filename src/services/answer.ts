import { Answer, AnswerRepository } from '@/contracts/repository/answer';
import { SurveyRepository } from '@/contracts/repository/survey';
import { AnswerService, CreateAnswerVars, FindAllAnswerArgs } from '@/contracts/service/answer';
import { EntityNotFoundError } from '@/utils/errors';

export class AuthorizingAnswerService implements AnswerService {
  public constructor(
    private answerRepository: AnswerRepository,
    private surveyRepository: SurveyRepository,
  ) {}

  public findAll(args: FindAllAnswerArgs): Answer[] {
    return this.answerRepository.findAll(args);
  }

  public create(vars: CreateAnswerVars): Answer[] {
    this.validateInput(vars);
    return this.answerRepository.create(vars.surveyId, vars.answers);
  }

  private validateInput(vars: CreateAnswerVars): void {
    const { surveyId, answers } = vars;
    const foundQuestions = this.surveyRepository.findByIdOrFail(surveyId);

    const uniqueQuestionIds = [...new Set(answers.map((answer) => answer.questionId))];
    const unknownIds = uniqueQuestionIds.filter(
      (questionId) => !foundQuestions.some((question) => question.id === questionId),
    );
    if (unknownIds.length > 0)
      throw new EntityNotFoundError(`Cannot find questions with ids ${unknownIds.join(',')}`);
  }
}
