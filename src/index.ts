import express, { NextFunction, Request, Response } from 'express';
import { authRoute } from './routes/auth.route';
import * as dotenv from 'dotenv';
import { dataBaseConnection } from './config/db.config';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(authRoute);

// Error Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ err });
});

dataBaseConnection(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port http://localhost:${PORT}`);
  });
});
