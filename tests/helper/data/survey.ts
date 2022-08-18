import { faker } from '@faker-js/faker';

import { QuestionType, Survey } from '@/contracts/repository/survey';

export const SURVEY_DATA: Survey = {
  id: faker.datatype.uuid(),
  createdAt: faker.datatype.datetime(),
  name: faker.datatype.string(),
  questions: [
    {
      answer: [faker.datatype.string()],
      id: faker.datatype.uuid(),
      question: faker.datatype.string(),
      questionType: QuestionType.Boolean,
      surveyId: faker.datatype.uuid(),
    },
  ],
};
