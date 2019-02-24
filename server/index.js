//cargar el modulo de express
var express = require('express');
//llamamos a express
var app = express();
//cargamos el server http para proceder a crearlo
var server = require('http').Server(app);
//se lo pasamos a socket.io
var io = require('socket.io')(server);

//cargamos un middleware de express para generar una vista statica
app.use(express.static('client'));

//creamos una ruta utilizando express para probar el servidor
app.get('/hola-mundo', function(req,res){
    res.status(200).send('hola mundo desde una ruta');
});

//creo variable con un array para guardar el mensaje por defecto
var messages = [{
        id:1,
        text: 'Bienvenido al chat privado de Socket.io y NodeJS de Gustavo Solano...',
        nickname: 'Bot-GSJ'
}];

//abrimos una conexion al socket
io.on('connection',function(socket){
    console.log("El nodo con IP:"+socket.handshake.address+" se ha conectado");

    //le envio el mensaje por defecto al cliente
    socket.emit('messages',messages);
 
    //recoger el evento para añadir el mensaje al arraya messages
    socket.on('add-message', function(data){
        messages.push(data);

        //emitir los mensajes a todos los clientes conectados
        io.sockets.emit('messages',messages);
    })
});

//creamos el servidor con Express
server.listen(6677, function(){
    console.log('Servidor esta funcionando en http://localhost:6677');
});

//lanzamos el servidor con el comando : 'npm start'