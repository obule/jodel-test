import { faker } from '@faker-js/faker';

import { Answer, CreateAnswerVars } from '@/contracts/repository/answer';
import { AnswerDataStore, SQLAnswerRepository } from '@/repository/answer';

describe('SQLAnswerRepository', () => {
  const repository = new SQLAnswerRepository();

  afterEach(() => {
    Object.keys(AnswerDataStore).forEach((key) => {
      delete AnswerDataStore[key];
    });
  });

  const expectEqualAnswer = (
    surveyId: string,
    createVar: CreateAnswerVars,
    createdAnswer: Answer,
  ): void => {
    expect(createdAnswer.id).toBeDefined();
    expect(createdAnswer.createdAt).toBeInstanceOf(Date);
    expect(createdAnswer.answer).toBe(createVar.answer);
    expect(createdAnswer.questionId).toBe(createVar.questionId);
    expect(createdAnswer.surveyId).toBeDefined();
    expect(createdAnswer.surveyId).toBe(surveyId);
  };

  const surveyId = faker.datatype.uuid();
  const createVars: CreateAnswerVars = {
    answer: [faker.datatype.string()],
    questionId: faker.datatype.uuid(),
  };
  describe('.create', () => {
    it('succeeds', () => {
      const [createdAnswer] = repository.create(surveyId, [createVars]);
      expectEqualAnswer(surveyId, createVars, createdAnswer);
      const [dataStoreAnswer] = AnswerDataStore[surveyId];
      expect(dataStoreAnswer).toStrictEqual(createdAnswer);
    });

    describe('with duplicate answers', () => {
      it('updates the previous answer', () => {
        const [firstCall] = repository.create(surveyId, [createVars]);
        // Call 2
        const [secondCall] = repository.create(surveyId, [createVars]);
        const dataStoreAnswer = AnswerDataStore[surveyId];
        expect(dataStoreAnswer).toHaveLength(1);
        expect(firstCall.questionId).toBe(secondCall.questionId);
        expect(firstCall.id).toBe(secondCall.id);
      });
    });
  });

  describe('.findAll', () => {
    beforeEach(() => {
      // Noise
      repository.create(faker.datatype.uuid(), [createVars]);
    });
    describe('with survey that does not exist', () => {
      it('returns empty array', () => {
        const answers = repository.findAll({ surveyId: faker.datatype.uuid() });
        expect(answers).toHaveLength(0);
      });
    });

    describe('with survey that exists', () => {
      it('succeeds', () => {
        const createdAnswer = repository.create(surveyId, [createVars]);
        const answers = repository.findAll({ surveyId });
        expect(answers).toEqual(createdAnswer);
      });
    });
  });
});
