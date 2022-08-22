import { faker } from '@faker-js/faker';
import request from 'supertest';

import app from '@/api/app';
import { setProvider } from '@/ioc/provider';
import { StatusCode } from '@/utils/errors';
import { ANSWER_DATA } from '~tests/helper/data/answer';
import { StubProvider } from '~tests/helper/Provider';

const BASE_ENDPOINT = '/api/v1/answer';
describe('Create answer Endpoint', () => {
  beforeEach(() => {
    setProvider(StubProvider());
  });

  describe('with invalid input', () => {
    it('fails with BAD_REQUEST', async () => {
      const response = await request(app)
        .post(`${BASE_ENDPOINT}`)
        .send({
          surveyId: faker.datatype.string(), // Should be UUID
          answers: [{ answer: [faker.datatype.string()], questionId: faker.datatype.uuid() }],
        });
      expect(response.statusCode).toBe(StatusCode.BadRequest);
    });
  });

  describe('with valid input', () => {
    it('succeeds', async () => {
      const response = await request(app)
        .post(`${BASE_ENDPOINT}`)
        .send({
          surveyId: faker.datatype.uuid(),
          answers: [{ answer: [faker.datatype.string()], questionId: faker.datatype.uuid() }],
        });
      expect(response.body.data).toEqual([
        {
          ...ANSWER_DATA,
          createdAt: ANSWER_DATA.createdAt.toISOString(),
        },
      ]);
      expect(response.statusCode).toBe(StatusCode.Success);
    });
  });
});

describe('Fetch answer', () => {
  describe('with invalid input', () => {
    it('fails with BAD_REQUEST', async () => {
      const response = await request(app).get(`${BASE_ENDPOINT}/badInput`);
      expect(response.statusCode).toBe(StatusCode.BadRequest);
    });
  });

  describe('with valid input', () => {
    it('succeeds', async () => {
      const response = await request(app).get(`${BASE_ENDPOINT}/${faker.datatype.uuid()}`);
      expect(response.statusCode).toBe(StatusCode.Success);
      expect(response.body.data).toEqual([
        {
          ...ANSWER_DATA,
          createdAt: ANSWER_DATA.createdAt.toISOString(),
        },
      ]);
    });
  });
});
