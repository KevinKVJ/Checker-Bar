const io = require('socket.io-client');

const socket = io('http://192.168.0.10:8000');

socket.emit('echo', "lalala");

socket.on('boardmessage',data => {
    console.log(data);
})
