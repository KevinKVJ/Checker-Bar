// import Koa from 'koa';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
const Koa = require("koa");
const {createServer} = require("http");
const {Server} = require("socket.io");

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

httpServer.listen(3001,() => {
    console.log("listening on *:3001");
});
