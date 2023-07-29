$(function () {
    const socket = io();
    let nick = '';

    //obteniendo los elementos del DOM desde la interfaz
    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');

    const usersNames = $('#usernames');

    //eventos
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    });

    //respuesta del servidor
    socket.on('nuevo mensaje', function (datas) {
        let color = "#f4f4f4";
        let messageClass = "other-message";

        if (datas.usernames === nick) {
            color = "#b7aea5";
            messageClass = "own-message";
        }

        chat.append(`<div class="msg-area mb-2 d-flex ${messageClass}" style="background-color:${color}"><b>${datas.usernames}: </b><p class="msg">${datas.msg}</p></div>`);
    });

    //usuario nuevo
    nickForm.submit(e => {
        e.preventDefault();

        socket.emit('nuevo usuario', nickName.val(), datas => {

            if (datas) {
                nick = nickName.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            } else {
                nickError.html(`
                    <div class="alert alert-danger">
                        Este usuario ya existe, eliga otro.
                    </div>
                `);
            }
            nickName.val('');
        });
    });

    //obtener usuarios
    socket.on('nombre usuario', datas => {
        let html = '';
        let color = '';
        let salir = '';

        for (let i = 0; i < datas.length; i++) {
            if (datas[i] == nick) {
                color = '#afff80';
                salir = '<a class="enlace-salir" href="/">Salir</a>';
            } else {
                color = '#000';
                salir = '';
            }
            html += `<p style="color: ${color}">${datas[i]} ${salir}</p>`;
        }

        usersNames.html(html);

    });
});

