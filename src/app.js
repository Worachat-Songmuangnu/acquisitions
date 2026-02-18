import express, { urlencoded } from 'express';
import logger from './config/logger.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors());
app.use(helmet());  
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

app.get('/', (req, res) => {
  logger.info('Received a request to the root endpoint');
  res.status(200).send('Hello From Acquisitions!');
});


export default app;