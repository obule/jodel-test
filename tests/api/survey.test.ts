import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '@/api/app';
import { QuestionType } from '@/contracts/repository/survey';
import { setProvider } from '@/ioc/provider';
import { StatusCode } from '@/utils/errors';
import { SURVEY_DATA } from '~tests/helper/data/survey';
import { StubProvider } from '~tests/helper/Provider';

describe('Survey Endpoint', () => {
  beforeEach(() => {
    setProvider(StubProvider());
  });

  const BASE_ENDPOINT = '/api/v1/survey';

  describe('with invalid input', () => {
    it('fails with BAD_REQUEST', async () => {
      const response = await request(app)
        .post(`${BASE_ENDPOINT}`)
        .send({
          name: faker.datatype.string(),
          description: faker.datatype.string(),
          questions: [
            {
              questionType: QuestionType.Boolean,
              question: faker.datatype.string(),
            },
          ],
        });
      expect(response.statusCode).toBe(StatusCode.BadRequest);
    });
  });

  describe('with valid input', () => {
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
      expect(response.body.data).toEqual({
        ...SURVEY_DATA,
        createdAt: SURVEY_DATA.createdAt.toISOString(),
      });
      expect(response.statusCode).toBe(StatusCode.Success);
    });
  });
});
