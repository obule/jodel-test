import express, { Request, Response } from 'express';

import { answerQueryPathValidator, createAnswerValidator } from '@/api/input/validator';
import { apiResponse } from '@/api/util';
import { CreateAnswerVars, FindAllAnswerArgs } from '@/contracts/service/answer';
import { getAnswerService } from '@/ioc/provider';
import { EntityNotFoundError, StatusCode } from '@/utils/errors';

const router = express.Router();

router.post('/', [...createAnswerValidator()], (req: Request, res: Response) => {
  try {
    const createVars = req.body as CreateAnswerVars;
    const answerService = getAnswerService();
    const response = answerService.create(createVars);
    if (!response)
      return res
        .status(StatusCode.NotFound)
        .json(apiResponse({ data: null, message: 'Survey not found.', success: false }));

    return res
      .status(StatusCode.Success)
      .json(apiResponse({ message: 'Answer created', data: response, success: true }));
  } catch (error) {
    if (error instanceof EntityNotFoundError)
      return res
        .status(StatusCode.NotFound)
        .json(apiResponse({ message: error.message, data: null, success: false }));
    return res
      .status(StatusCode.InternalServerError)
      .json(apiResponse({ message: 'Internal Server error', data: null, success: false }));
  }
});

router.get('/:surveyId', [...answerQueryPathValidator()], (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params as FindAllAnswerArgs;
    const answerService = getAnswerService();
    const response = answerService.findAll({ surveyId });
    res
      .status(StatusCode.Success)
      .json({ message: 'Answer fetched!', data: response, success: true });
  } catch (error) {
    res.status(StatusCode.InternalServerError).json({ message: error, data: null, success: false });
  }
});

export default router;
