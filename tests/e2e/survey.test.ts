import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '@/api/app';
import { QuestionType } from '@/contracts/repository/survey';
import { SurveyDataStore } from '@/repository/survey';
import { StatusCode } from '@/utils/errors';

describe('with valid input', () => {
  const BASE_ENDPOINT = '/api/v1/survey';

  afterAll(() => {
    Object.keys(SurveyDataStore).forEach((key) => {
      delete SurveyDataStore[key];
    });
  });

  it('succeeds', async () => {
    const response = await request(app)
      .post(`${BASE_ENDPOINT}`)
      .send({
        name: faker.datatype.string(),
        description: faker.datatype.string(),
        questions: [
          {
            questionType: QuestionType.Boolean,
            question: faker.datatype.string(),
            answer: [faker.datatype.string()],
          },
        ],
      });

    expect(response.statusCode).toBe(StatusCode.Success);
  });
});
