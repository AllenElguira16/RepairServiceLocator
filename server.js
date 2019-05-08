var express = require("express");
var http = require("https");
var fs = require("fs");

var app = express();
var privateKey = fs.readFileSync('../../apache/cert/www.repairservicelocator.test/server.key', 'utf8');
var certificate = fs.readFileSync('../../apache/cert/www.repairservicelocator.test/server.crt', 'utf8');
var credentials = {
    key: privateKey,
    cert: certificate
};
var httpServer = http.Server(credentials, app);

var io = require("socket.io")(httpServer);
var port = 8000;
// var clientAddress = "https://www.repairservicelocator.test";

io.on('connection', function (socket) {
    socket.on('newChat', () => {
        console.log('newChat');
        io.emit('newChat');
        // io.emit('reloadNotif');
    });
    socket.on('newQuestions', function () {
        io.emit('newQuestions');
        io.emit('reloadNotif');
    });
    socket.on('newAnswer', ($id) => {
        io.emit("newAnswer", $id);
        io.emit('reloadNotif');
    });
    socket.on('newRating', () => {
        io.emit('newRating');
        io.emit('reloadNotif');
    });
    socket.on('newShops', () => {
        io.emit('newShops');
    });
    socket.on('userLoggedIn', () => {
        io.emit('userLoggedIn');
    });
});

httpServer.listen(port, () => {
    console.log("listening on port: " + port);
});