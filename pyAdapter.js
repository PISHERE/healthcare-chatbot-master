const pyShell = require('python-shell');

class PythonAdapter {
    constructor(socket) {
        this.chatBot = new pyShell.PythonShell('./chat_bot.py');


        this.socketConnected = socket;
        this.isNameDone = false;
        this.chats = [
            {
                message: 'Welcome to HealthCare Chat Bot',
                time: '12:30',
                isBot: true
            },
            {
                message: 'Whats your name ?',
                time: '12:30',
                isBot: true
            }
        ];

        this.chatBot.on('message', (msg) => {
            const message = {
                isBot:true,
                message:msg,
                time:'12:90'
            }
            this.chats.push(message)
            console.log(msg);
            socket.emit('message', this.chats);
        });
        this.chatBot.on('pythonError', (err) => {
            console.log(err);
        });
        this.chatBot.on('error', (err) => {
            console.log(err);
        });
        this.chatBot.on('close', () => {
            console.log("closed Instance ");
        });
    }

    async send(message) {
        if (!this.isNameDone) {
            this.isNameDone = true;
            this.name = message;
        }
        this.chats.push(
            {
                message: message,
                time: '1:00',
                user: this.name,
                isBot: false
            }
        )
        console.log(this.chatBot.command);
        this.chatBot.send(message);
        console.log('Sent Command: ', message);
    }


}
module.exports = PythonAdapter;