const pyShell = require('python-shell');
const express = require('express');
const res = require('express/lib/response');
const app = express();
// Models
const chatBody= {
    message:'',
    time:'',
    user:'',
    isBot:true
}
const chats = [
    {
        message:'Welcome to HealthCare Chat Bot',
        time:'12:30',
        isBot:true
    },
    {
        message:'Whats your name ?',
        time:'12:30',
        isBot:true
    }
];
let userName = ''
const botMessages = [];
var totalUpdatedMessages = 0;

app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded())
app.get('/',function(req,res){
 res.render('pages/index',{
     msgHistory:chats
 })
})

app.post('/message',async(req,res)=>{
    console.log(req.body.message);
    chats.push({
        message:req.body.message,
        time:'1:00',
        isBot:false
    })
    chatBot.send(req.body.message);
    await new Promise(resolve => {
        setTimeout(() => {
            if(totalUpdatedMessages<botMessages.length){
                resolve();
            }
        }, 1000);
      });
      var i =0
    for(i=totalUpdatedMessages;i<botMessages.length;i++){
        const newMsg = {
            message: botMessages[i],
            isBot:true,
            time:'12:30',
        }
        chats.push(newMsg);
    }
    totalUpdatedMessages=i;
    
    res.render('pages/index',{
        msgHistory:chats
    })
})

const chatBot = new pyShell.PythonShell('./chat_bot.py');
chatBot.on('message',function(message){
    console.log('\n newMessgae: '+message+'\n');
    botMessages.push(message)
    // ejs 
});
chatBot.on('error',function(err){
    console.error(err);
})
chatBot.on('pythonError',function(err){
    console.error(err);
})
chatBot.on('stderr',function(err){
    console.log(err);
})
chatBot.on('close',function(){
    console.log('App closed');
})

app.listen(8000)
console.log('Listening in port 8000 ... ');