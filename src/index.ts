import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { authRoute } from './routes/auth.route';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectToDatabase from './config/db.config';
import { portfolioRoute } from './routes/portfolio.route';
import { CustomError } from './error/CustomError';
import { ChatRoute } from './routes/chat.route';
import cors from 'cors';
import swaggerDoc from './utils/swagger';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoute);
app.use(portfolioRoute);
app.use(ChatRoute);

// swagger
swaggerDoc(app, PORT);
// Error Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    return res
      .status(error.status_code)
      .json({ error: error.serializerError() });
  }
  // res.status(500).json({ error: 'Internal Server Error !!!' });
  res.status(400).json({ error: error });
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not Found !!!!');
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
