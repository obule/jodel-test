import { v4 as uuidv4 } from 'uuid';

import {
  Answer,
  AnswerRepository,
  CreateAnswerVars,
  FindAllAnswerArgs,
} from '@/contracts/repository/answer';

export const AnswerDataStore: Record<string, Answer[]> = {};

export class SQLAnswerRepository implements AnswerRepository {
  public findAll(args: FindAllAnswerArgs): Answer[] {
    const { surveyId } = args;
    return AnswerDataStore[surveyId] ?? [];
  }

  public create(surveyId: string, vars: CreateAnswerVars[]): Answer[] {
    if (!AnswerDataStore[surveyId]) {
      AnswerDataStore[surveyId] = [];
    }

    const surveyAnswers = AnswerDataStore[surveyId];
    if (surveyAnswers.length === 0) {
      const answers = this.transformAnswer(surveyId, vars);
      AnswerDataStore[surveyId] = answers;
      return answers;
    }

    return this.ensureNoDuplicates(surveyId, vars);
  }

  private transformAnswer(surveyId: string, vars: CreateAnswerVars[]): Answer[] {
    return vars.map((currentVar) => ({
      ...currentVar,
      id: uuidv4(),
      createdAt: new Date(),
      surveyId,
    }));
  }

  private ensureNoDuplicates(surveyId: string, vars: CreateAnswerVars[]): Answer[] {
    const surveyAnswers = AnswerDataStore[surveyId];
    const answers: Answer[] = [];
    vars.forEach((currentVar) => {
      const foundIndex = surveyAnswers.findIndex(
        (answer) => answer.questionId === currentVar.questionId,
      );
      if (foundIndex !== -1) {
        const updatedAnswer = {
          ...surveyAnswers[foundIndex],
          ...currentVar,
          createdAt: new Date(),
        };
        answers.push(updatedAnswer);
        surveyAnswers[foundIndex] = updatedAnswer;
      } else {
        const currentAnswer = { ...currentVar, surveyId, id: uuidv4(), createdAt: new Date() };
        answers.push(currentAnswer);
        surveyAnswers.push(currentAnswer);
      }
    });

    return answers;
  }
}
