"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.socketConnection = void 0;
const socket_io_1 = require("socket.io");
let socketIo = null;
const socketConnection = (httpServer) => {
    socketIo = new socket_io_1.Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });
    return socketIo;
};
exports.socketConnection = socketConnection;
const getIO = () => {
    if (!socketIo) {
        throw new Error('Socket Io is not Connected !!!');
    }
    return socketIo;
};
exports.getIO = getIO;
//# sourceMappingURL=connection.js.map