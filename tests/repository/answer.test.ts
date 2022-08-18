import { faker } from '@faker-js/faker';

import { Answer, CreateAnswerVars } from '@/contracts/repository/answer';
import { AnswerDataStore, SQLAnswerRepository } from '@/repository/answer';

describe('SQLAnswerRepository', () => {
  const repository = new SQLAnswerRepository();

  afterEach(() => {
    AnswerDataStore.length = 0;
  });

  const expectEqualAnswer = (createVar: CreateAnswerVars, createdAnswer: Answer): void => {
    expect(createdAnswer.id).toBeDefined();
    expect(createdAnswer.createdAt).toBeInstanceOf(Date);
    expect(createdAnswer.answer).toBe(createVar.answer);
    expect(createdAnswer.questionId).toBe(createVar.questionId);
    expect(createdAnswer.surveyId).toBe(createVar.surveyId);
  };
  const surveyId = faker.datatype.uuid();
  const createVars: CreateAnswerVars = {
    answer: [faker.datatype.string()],
    questionId: faker.datatype.uuid(),
    surveyId,
  };
  describe('.create', () => {
    it('succeeds', () => {
      const createdAnswer = repository.create(createVars);
      expectEqualAnswer(createVars, createdAnswer);
      const [dataStoreAnswer] = AnswerDataStore;
      expect(dataStoreAnswer).toStrictEqual(createdAnswer);
    });
  });

  describe('.findAll', () => {
    beforeEach(() => {
      // Noise
      repository.create({ ...createVars, surveyId: faker.datatype.uuid() });
    });
    describe('with survey that does not exist', () => {
      it('returns empty array', () => {
        const answers = repository.findAll({ surveyId: faker.datatype.uuid() });
        expect(answers).toHaveLength(0);
      });
    });

    describe('with survey that exists', () => {
      it('succeeds', () => {
        const createdAnswer = repository.create(createVars);
        const answers = repository.findAll({ surveyId });
        expect(answers).toEqual([createdAnswer]);
      });
    });
  });
});
