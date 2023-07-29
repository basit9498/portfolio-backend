import { Server } from 'socket.io';
import http from 'http';

let socketIo: Server | null = null;
export const socketConnection = (httpServer: http.Server) => {
  socketIo = new Server(httpServer, {
    cors: {
      origin: 'http://localhost:3000', // Allow requests from this origin
      methods: ['GET', 'POST'], // Allow these HTTP methods
      credentials: true,
    },
  });

  return socketIo;
};

export const getIO = (): Error | Server => {
  if (!socketIo) {
    throw new Error('Socket Io is not Connected !!!');
  }

  return socketIo;
};
