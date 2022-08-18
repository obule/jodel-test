import { faker } from '@faker-js/faker';
import { mock } from 'jest-mock-extended';

import { QuestionType, SurveyRepository } from '@/contracts/repository/survey';
import { CreateSurveyVars } from '@/contracts/service/survey';
import { AuthorizingSurveyService } from '@/services/survey';
import { SURVEY_DATA } from '~tests/helper/data/survey';

describe('AuthorizingSurveyService', () => {
  const surveyRepoMock = mock<SurveyRepository>();
  const service = new AuthorizingSurveyService(surveyRepoMock);

  describe('.create', () => {
    it('succeeds', () => {
      surveyRepoMock.create.mockReturnValue(SURVEY_DATA);
      const createVars: CreateSurveyVars = {
        name: faker.datatype.string(),
        questions: [
          {
            answer: [faker.datatype.string()],
            question: faker.datatype.string(),
            questionType: QuestionType.MultiChoice,
          },
        ],
      };
      const result = service.create(createVars);
      expect(result).toBe(SURVEY_DATA);
      expect(surveyRepoMock.create).toHaveBeenCalledWith(createVars);
    });
  });
});
