const io = require('socket.io-client');

const socket = io('http://192.168.239.194:8000');

socket.emit('echo', "lalala");

socket.on('boardmessage',data => {
    console.log(data);
})