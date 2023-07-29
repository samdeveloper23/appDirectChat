module.exports = (io) => {
    let nickNames = [];

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('enviar mensaje', (datas) => {
            io.sockets.emit('nuevo mensaje', {
                msg: datas,
                usernames: socket.nickname,
            });
        });

        socket.on('nuevo usuario', (datas, callback) => {

            if (nickNames.indexOf(datas) != -1) {
                callback(false);
            } else {
                callback(true);
                socket.nickname = datas;
                nickNames.push(socket.nickname);
                io.sockets.emit('nombre usuario', nickNames);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            if (!socket.nickname) {
                return;
            } else {
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                io.sockets.emit('nombre usuario', nickNames);
            }
        });

    });
}