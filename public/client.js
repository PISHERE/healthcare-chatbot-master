const messageContainer = document.getElementById('msger-chat');
const messageForm = document.getElementById('send-form');
const messageInput = document.getElementById('message-input');
const socket = io.connect('http://localhost:3000')
console.log('Connected')

socket.on('message', (msg) => {
    console.log('yes=> ', msg);
    AppendMessage(msg);
})

function AppendMessage(msg) {
    messageContainer.replaceChildren()
    msg.forEach(element => {
        let mesg;
        if(element.isBot){
         mesg = getLeftMessage(element);
        } else{
         mesg = getRightMessage(element);
        }
        const domElement = new DOMParser().parseFromString(mesg, "text/html");
        for (var i = 0; i <= domElement.body.childNodes.length; i++) {
            messageContainer.appendChild(domElement.body.childNodes[i]);
        }
    });
}

messageForm.addEventListener('submit',e=>
{
    e.preventDefault();
    const message = messageInput.value;
    console.log(message);
    socket.emit('message',message)
    messageInput.value = ''
})

function getLeftMessage(data) {
    return `<div class="msg left-msg">
    <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)">
    </div>

    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">
          Bot
        </div>
        <div class="msg-info-time">
          ${data.time}
        </div>
      </div>

      <div class="msg-text">
        ${data.message}
      </div>
    </div>
  </div>`
}

function getRightMessage(data) {
    return `<div class="msg right-msg">
    <div class="msg-img" style="background-image: url(https://image.flaticon.com/icons/svg/327/327779.svg)">
    </div>

    <div class="msg-bubble">
      <div class="msg-info">
        <div class="msg-info-name">
          ${data.user}
        </div>
        <div class="msg-info-time">
          ${data.time}
        </div>
      </div>

      <div class="msg-text">
        ${data.message}
      </div>
    </div>
  </div>`
}

