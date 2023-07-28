"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./routes/auth.route");
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_config_1 = __importDefault(require("./config/db.config"));
const portfolio_route_1 = require("./routes/portfolio.route");
const CustomError_1 = require("./error/CustomError");
const chat_route_1 = require("./routes/chat.route");
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./utils/swagger"));
const http_1 = __importDefault(require("http"));
const connection_1 = require("./socket/connection");
const user_model_1 = require("./models/user.model");
const user_model_interface_1 = require("./interfaces/models/user.model.interface");
// import { Server } from 'socket.io';
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: 'http://localhost:3000',
//   },
// });
const io = (0, connection_1.socketConnection)(server);
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use('/upload', express_1.default.static('upload'));
app.use(auth_route_1.authRoute);
app.use(portfolio_route_1.portfolioRoute);
app.use(chat_route_1.ChatRoute);
// swagger
(0, swagger_1.default)(app, PORT);
// Error Middleware
app.use((error, req, res, next) => {
    if (error instanceof CustomError_1.CustomError) {
        return res
            .status(error.status_code)
            .json({ error: error.serializerError() });
    }
    // res.status(500).json({ error: 'Internal Server Error !!!' });
    res.status(400).json({ error: error });
});
app.use('*', (req, res, next) => {
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
(0, db_config_1.default)()
    .then(() => {
    // app.list
    io.on('connection', (socket) => {
        console.log('client connection', socket.id);
        //user online status
        socket.on('user_online', async (data) => {
            console.log('user_online', data);
            if (data?.userId) {
                await user_model_1.User.updateActiveStatus(data?.userId, user_model_interface_1.ActiveStatus.ONLINE);
            }
            socket.broadcast.emit('user_active_status', {
                userId: data?.userId,
                active: user_model_interface_1.ActiveStatus.ONLINE,
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
                active: user_model_interface_1.ActiveStatus.OFFLINE,
            });
            console.log('useId disconnect query', userId);
            if (userId) {
                await user_model_1.User.updateActiveStatus(userId, user_model_interface_1.ActiveStatus.OFFLINE);
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
//# sourceMappingURL=index.js.map