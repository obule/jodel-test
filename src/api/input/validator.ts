/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { body, check, param } from 'express-validator';
import { validationResult } from 'express-validator/src/validation-result';

export function parameterValidationMiddleware(): RequestHandler {
  return (req, res, next): any => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  };
}

export function answerQueryPathValidator(): RequestHandler[] {
  return [
    param('surveyId').isUUID().withMessage('Please supply a valid UUID.'),
    parameterValidationMiddleware(),
  ];
}

export function createSurveyValidator(): RequestHandler[] {
  return [
    body('name').isString().notEmpty().withMessage('Survey name is required'),
    body('description').isString().optional(),
    body('questions').isArray().notEmpty(),
    check('questions.*.questionType').isString().notEmpty(),
    check('questions.*.question').isString().notEmpty(),
    check('questions.*.answer').isArray().notEmpty(),
    parameterValidationMiddleware(),
  ];
}

export function createAnswerValidator(): RequestHandler[] {
  return [
    body('answer').isArray().notEmpty(),
    body('questionId').isUUID('4').notEmpty(),
    body('surveyId').isUUID('4').notEmpty(),
    parameterValidationMiddleware(),
  ];
}
