import express, { Request, Response } from 'express';

import { createSurveyValidator } from '@/api/input/validator';
import { apiResponse } from '@/api/util';
import { CreateSurveyVars } from '@/contracts/service/survey';
import { getSurveyService } from '@/ioc/provider';
import { StatusCode } from '@/utils/errors';

const router = express.Router();

router.post('/', [...createSurveyValidator()], (req: Request, res: Response) => {
  try {
    const { name, questions, description } = req.body as CreateSurveyVars;
    const surveyService = getSurveyService();
    const response = surveyService.create({ name, questions, description });
    res
      .status(StatusCode.Success)
      .json(apiResponse({ message: 'Survey created', success: true, data: response }));
  } catch (error) {
    res.status(StatusCode.InternalServerError).json({ message: error, success: false, data: null });
  }
});

export default router;
