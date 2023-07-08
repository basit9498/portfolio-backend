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
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/upload', express.static('upload'));
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

// websocket section *****start******
io.on('connection', (socket) => {
  // console.log('server a is connect my', socket.id);

  // socket.on('send_message', (data) => {
  //   socket.broadcast.emit('received_message', data);
  // });

  // ---join room ------
  socket.on('join_room', (data) => {
    console.log('join data', data);
    socket.join(data.roomId);
  });

  // send message to room

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data?.roomId).emit('received_message', data);
  });
});
// websocket section *****end******

connectToDatabase()
  .then(() => {
    // app.list
    server.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
