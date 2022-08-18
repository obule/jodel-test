import { faker } from '@faker-js/faker';

import { Answer } from '@/contracts/repository/answer';

export const ANSWER_DATA: Answer = {
  id: faker.datatype.uuid(),
  answer: [faker.datatype.string()],
  questionId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  createdAt: faker.datatype.datetime(),
};
