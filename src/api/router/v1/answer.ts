import express, { Request, Response } from 'express';

import { answerQueryPathValidator, createAnswerValidator } from '@/api/input/validator';
import { CreateAnswerVars, FindAllAnswerArgs } from '@/contracts/service/answer';
import { getAnswerService } from '@/ioc/provider';
import { StatusCode } from '@/utils/errors';

const router = express.Router();

router.post('/', [...createAnswerValidator()], (req: Request, res: Response) => {
  try {
    const { answer, questionId, surveyId } = req.body as CreateAnswerVars;
    const answerService = getAnswerService();
    const response = answerService.create({ answer, questionId, surveyId });
    res.status(StatusCode.Success).send(response);
  } catch (error) {
    res.status(StatusCode.InternalServerError).send(error);
  }
});

router.get('/:surveyId', [...answerQueryPathValidator()], (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params as FindAllAnswerArgs;
    const answerService = getAnswerService();
    const response = answerService.findAll({ surveyId });
    res.status(StatusCode.Success).send(response);
  } catch (error) {
    res.status(StatusCode.InternalServerError).send(error);
  }
});

export default router;
