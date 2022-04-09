const io = require('socket.io-client');

const socket = io('http://10.12.187.218:8000');

socket.emit('echo', "lalala");

socket.on('boardmessage',data => {
    console.log(data);
})


