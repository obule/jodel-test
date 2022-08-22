import express from 'express';

import answerRouter from '@/api/router/v1/answer';
import surveyRouter from '@/api/router/v1/survey';

const router = express.Router();
router.use('/survey', surveyRouter);
router.use('/answer', answerRouter);

export default router;
