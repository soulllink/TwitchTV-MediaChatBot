require('dotenv').config();

//wellcome to hell
const serve = require('koa-static');
const Koa = require('koa');
const TwitchBot = require('twitch-bot')
const koaapp = new Koa();
const soundFolder = './www/sounds';
const videoFolder = './www/videos';
const fs = require('fs');
const WebSocket = require('ws')
const sockets = new Map();
const mm = require('music-metadata');
const { getCoins, coinsOperator, userOperator} = require('./database');


//create ws
const wss = new WebSocket.Server({ port: 3333 })
wss.on('connection', ws => {
    sockets.set('key', ws)
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
    })
     
})

//reading files
const listfiles = fs.readdirSync(soundFolder);
console.log(listfiles);
function command (com) {
    input = com.replace(/\W/, "");
    if (listfiles.includes(input + ".mp3")) {
        return true;
        
    }
}
const listvideos = fs.readdirSync(videoFolder);
console.log(listvideos);
function videocommand (com) {
    input = com.replace(/\W/, "");
    if (listvideos.includes(input + ".mp4")) {
        return true;
    }
}

//ws API operator
function callsend(data) {
    const ws = sockets.get('key')
    ws.send(data)
}
function wsoperator(message, type) {
    let datatype = type;
    let filepath = [];
    let durationdata = [];
    if (type === 'mp3') {
        filepath = './www/sounds/' + message + '.mp3';
    }
    if (type === 'mp4') {
        filepath = './www/videos/' + message + '.mp4';
    }
    mm.parseFile(filepath, {native: true})
    .then( async metadata => {
        durationdata = metadata.format.duration;
        console.log(durationdata);
        let dataobj = JSON.stringify({
            "filename": message,
            "duration": durationdata,
            "type": datatype
        })
        callsend(dataobj);
    })
    .catch(
        err => {
            console.error(err.message);
    })
    
    
}

// bot AUTHdata
const Bot = new TwitchBot({
    username: process.env.USERNAME,
    oauth: process.env.OAUTH,
    channels: [process.env.TWITCH_CHANNEL]
  })

  


//bot things
Bot.on('join', channel => {
    console.log(`Joined channel: ${channel}`)
})
  
Bot.on('error', err => {
    console.log(err)
})
  
Bot.on('message', chatter => {
    if(chatter.message === '!list') {
      Bot.say('Sound: '+ listfiles.toString().replace(/.mp3/gi, "") + ' Video: ' + listvideos.toString().replace(/.mp4/gi, "") + ` PogChamp`)
    }
    
})

Bot.on('message', chatter => {
    if(chatter.message === '!coins') {
        Bot.say(chatter.display_name + ' ' + process.env.COINS_GREETINGS + ' ' + getCoins(chatter.display_name) + ' PogChamp')
    }
})

//scanbot
Bot.on('message', chatter => {
    if(command(chatter.message)){
        if(coinsOperator(chatter.display_name)) {
            wsoperator(chatter.message.replace(/\W/, ""), 'mp3')
            //console.log("coins spend: " + chatter.display_name);
        }
        
    } else if (videocommand(chatter.message)) {
        if(coinsOperator(chatter.display_name)) {
            wsoperator(chatter.message.replace(/\W/, ""), 'mp4')
            //console.log("coins spend: " + chatter.display_name);
        }
        
    } else {
        userOperator(chatter.display_name);
        
    };
})

//serve static files
koaapp.use(serve('www'));


koaapp.listen(3000);

console.log('listening on port 3000');

