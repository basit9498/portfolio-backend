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
import { socketConnection } from './socket/connection';
import { User } from './models/user.model';
import { ActiveStatus } from './interfaces/models/user.model.interface';
// import { Server } from 'socket.io';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });
const io = socketConnection(server);

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
// io.on('connection', (socket) => {
//   // console.log('server a is connect my', socket.id);

//   // socket.on('send_message', (data) => {
//   //   socket.broadcast.emit('received_message', data);
//   // });

//   // ---join room ------
//   socket.on('join_room', (data) => {
//     console.log('join data', data);
//     socket.join(data.roomId);
//   });

//   // send message to room

//   socket.on('send_message', (data) => {
//     console.log(data);
//     socket.to(data?.roomId).emit('received_message', data);
//   });
// });
// websocket section *****end******

connectToDatabase()
  .then(() => {
    // app.list
    io.on('connection', (socket) => {
      console.log('client connection', socket.id);

      //user online status
      socket.on('user_online', async (data) => {
        console.log('user_online', data);
        if (data?.userId) {
          await User.updateActiveStatus(
            data?.userId as string,
            ActiveStatus.ONLINE
          );
        }
        socket.broadcast.emit('user_active_status', {
          userId: data?.userId,
          active: ActiveStatus.ONLINE,
        });
      });

      // create new ChatRoom for chat
      socket.on('join_chat_room', (data) => {
        socket.join(data?.chat_room_id);
        console.log('client handshake');
      });

      // Leave Room
      socket.on('leave_room', (data) => {
        console.log('leave_room', data);
        socket.leave(data?.data);
      });

      // share chat

      socket.on('message_send', (data) => {
        // console.log('room', socket.rooms);
        console.log('message_send', data?.data.chat_room_id);
        socket
          .to(data?.data.chat_room_id)
          .emit('message_received', { data: { ...data?.data } });
      });

      // Disconnect
      socket.on('disconnect', async (reason) => {
        console.log('reason disconnect:', reason);
        console.log('reason disconnect:', socket.handshake.query?.userId);
        // update user active user status
        const userId = socket.handshake.query?.userId;
        socket.broadcast.emit('user_active_status', {
          userId: userId,
          active: ActiveStatus.OFFLINE,
        });
        console.log('useId disconnect query', userId);
        if (userId) {
          await User.updateActiveStatus(userId as string, ActiveStatus.OFFLINE);
        }
      });

      // get All Rooms detail
      // const rooms = io.sockets.adapter.rooms;
      // console.log('room connected ', rooms);
      // const room = rooms.get('64b225409ca1551aff35d9e0');
      // console.log('get Room ', room);
    });
    server.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
