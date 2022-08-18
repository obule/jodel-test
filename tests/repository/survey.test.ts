import { faker } from '@faker-js/faker';

import { CreateSurveyVars, QuestionType, Survey } from '@/contracts/repository/survey';
import { SQLSurveyRepository, SurveyDataStore } from '@/repository/survey';

describe('SQLSurveyRepository', () => {
  const repository = new SQLSurveyRepository();

  afterEach(() => {
    Object.keys(SurveyDataStore).forEach((key) => {
      delete SurveyDataStore[key];
    });
  });

  const expectEqualSurvey = (createVars: CreateSurveyVars, createdSurvey: Survey): void => {
    expect(createdSurvey.id).toBeDefined();
    expect(createdSurvey.createdAt).toBeInstanceOf(Date);
    expect(createdSurvey.name).toBe(createVars.name);
    expect(createdSurvey.description).toBe(createVars.description);
    createdSurvey.questions.forEach((question, index) => {
      const currentSurveyQuestion = createVars.questions[index];
      expect(question.id).toBeDefined();
      expect(question.surveyId).toBe(createdSurvey.id);
      expect(question.questionType).toBe(currentSurveyQuestion.questionType);
      expect(question.question).toBe(currentSurveyQuestion.question);
      expect(question.answer).toBe(currentSurveyQuestion.answer);
    });
  };

  describe('.create', () => {
    it('succeeds', () => {
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
      const createdSurvey = repository.create(createVars);
      expectEqualSurvey(createVars, createdSurvey);
      const storedData = SurveyDataStore[createdSurvey.id];
      expect(storedData).toBeDefined();
      expect(createdSurvey.questions).toStrictEqual(storedData);
    });
  });
});
