const io = require('socket.io-client');

// const socket = io('http://10.13.110.27:8000');
const socket = io('http://10.13.92.158:8000');
socket.emit('echo', "lalala");

socket.on('boardmessage',data => {
    console.log(data);
})


