/* eslint-disable */

import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';

import { AnswerRepository } from '@/contracts/repository/answer';
import { QuestionType, SurveyRepository } from '@/contracts/repository/survey';
import { FindAllAnswerArgs } from '@/contracts/service/answer';
import { AuthorizingAnswerService } from '@/services/answer';
import { ANSWER_DATA } from '~tests/helper/data/answer';

describe('AuthorizingAnswerService', () => {
  const answerRepositoryMock = mock<AnswerRepository>();
  const surveyRepoMock = mock<SurveyRepository>();
  const service = new AuthorizingAnswerService(answerRepositoryMock, surveyRepoMock);

  describe('.findAll', () => {
    it('succeeds', () => {
      answerRepositoryMock.findAll.mockReturnValue([ANSWER_DATA]);
      const args: FindAllAnswerArgs = { surveyId: faker.datatype.uuid() };
      const result = service.findAll(args);
      expect(answerRepositoryMock.findAll).toHaveBeenCalledWith(args);
      expect(result).toStrictEqual([ANSWER_DATA]);
    });
  });

  describe('.create', () => {
    const surveyId = faker.datatype.uuid();
    describe('with survey that does not exist', () => {
      it('fails', () => {
        try {
          surveyRepoMock.findByIdOrFail.calledWith(surveyId).mockImplementation(() => {
            throw new Error();
          });
          service.create({ answers: [], surveyId });
          throw Error(); // Never reaches here
        } catch (error) {}
      });
    });

    describe('with survey that exists', () => {
      describe('with question that does not exist', () => {
        it('fails', () => {
          try {
            surveyRepoMock.findByIdOrFail.mockReturnValue([]);
            service.create({ answers: [], surveyId });
            throw Error(); // Should never reach here
          } catch (error) {}
        });
      });

      describe('with question that exists', () => {
        it('succeeds', () => {
          const questionId = faker.datatype.uuid();
          surveyRepoMock.findByIdOrFail.mockReturnValue([
            {
              answer: [],
              id: questionId,
              question: faker.datatype.string(),
              surveyId,
              questionType: QuestionType.Boolean,
            },
          ]);
          const vars = { answers: [], surveyId };
          service.create(vars);
          expect(answerRepositoryMock.create).toHaveBeenCalledWith(surveyId, vars.answers);
        });
      });
    });
  });
});
