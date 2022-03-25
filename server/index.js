const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("disconnect", (reason) => {
        console.log("A user DISCONNECTED.");
    })

    socket.on("sendPicture", (payload) => {
        console.log("Picture received.");
        console.log(payload);

        fs.writeFile("out.png", payload, "binary", err => {
            if (err) {
                console.log(err);
            }
        });
    })

    setTimeout(() => {
        console.log("Asking client for picture");
        socket.emit("getPicture");
    }, 10000);
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));