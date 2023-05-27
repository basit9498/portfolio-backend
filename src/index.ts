import express, { NextFunction, Request, Response } from 'express';
import { authRoute } from './routes/auth.route';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectToDatabase from './config/db.config';
import { portfolioRoute } from './routes/portfolio.route';
import { CustomError } from './error/CustomError';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoute);
app.use(portfolioRoute);
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
  res.send(`Testing API ${PORT}`);
});
// Error Middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    const { message, status_code } = error.serializer();
    res.status(status_code).json({ error: message });
  }
  res.status(500).json({ error: 'Internal Server Error !!!' });
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not Found !!!!');
});

// dataBaseConnection(() => {
//   app.listen(PORT, () => {
//     // eslint-disable-next-line no-console
//     console.log(`App listening on port http://localhost:${PORT}`);
//   });
// });
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
