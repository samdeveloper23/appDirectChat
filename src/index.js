const express = require('express');
const path = require('path');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('port', process.env.PORT || 3000);

//conectamos el socket
require('./sockets.js')(io);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

server.listen(app.get('port'), () => {
    console.log('Server is up on port', app.get('port'));
});