//conectar el cliente al server
var socket = io.connect('http://192.168.1.6:6677',{'forceNew':true});

//recibimos el mensaje por medio del cliente
socket.on('messages', function(data){
    console.log(data);
    //utilizo la funcion render y le paso los datos
    render(data);
});

//pinta el mensaje en el html
function render(data){

    //map sirve para iterar
    var html = data.map( function(message,index){
        return (`
           <div class="message">
                <string>${message.nickname}</strong> dice:
                <p>${message.text}</p>
           </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;

}

//funcion donde recibimos el evento 
function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text:document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message',message);

    return false;
}