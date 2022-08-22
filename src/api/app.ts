import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import router from '@/api/router/v1';

const expressApp = express();
expressApp.use(cors());
expressApp.use(bodyParser.json());
expressApp.use('/api/v1', router);
export default expressApp;
