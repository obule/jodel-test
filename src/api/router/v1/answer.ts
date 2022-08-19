import express, { Request, Response } from 'express';

import { answerQueryPathValidator, createAnswerValidator } from '@/api/input/validator';
import { apiResponse } from '@/api/util';
import { CreateAnswerVars, FindAllAnswerArgs } from '@/contracts/service/answer';
import { getAnswerService } from '@/ioc/provider';
import { StatusCode } from '@/utils/errors';

const router = express.Router();

router.post('/', [...createAnswerValidator()], (req: Request, res: Response) => {
  try {
    const { answer, questionId, surveyId } = req.body as CreateAnswerVars;
    const answerService = getAnswerService();
    const response = answerService.create({ answer, questionId, surveyId });
    res
      .status(StatusCode.Success)
      .send(apiResponse({ message: 'Answer created', data: response, success: true }));
  } catch (error) {
    res.status(StatusCode.InternalServerError).send({ message: error, data: null, success: false });
  }
});

router.get('/:surveyId', [...answerQueryPathValidator()], (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params as FindAllAnswerArgs;
    const answerService = getAnswerService();
    const response = answerService.findAll({ surveyId });
    res
      .status(StatusCode.Success)
      .send({ message: 'Answer fetched!', data: response, success: true });
  } catch (error) {
    res.status(StatusCode.InternalServerError).send({ message: error, data: null, success: false });
  }
});

export default router;
