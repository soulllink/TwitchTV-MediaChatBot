# KoaTwitchBotv2

It uses Koa + Twitch-Bot

Every file that you place in media folders becomes a !command without hussle and bussel.

!list - for all commands
!coins - for balance
!%FileName% - to run a command

## Download:

[alphav1](https://github.com/Teoreez/KoaTwitchBot/blob/master/release/KoaTwitchApp-alphav1.zip)

1. Config in resources/app/config.js
2. Botname - self
3. oauth - read:bellow Generate Twitch OAUTH
4. channel - self
5. ????
6. save and start app

## Prerequisite

1. You need to install Node.js (LTS)
2. open folder with files in termenal( for set drive on D: 'D:'; for set folder 'cd folder')
3. 'npm update' - for install all node_modules
4. 'npm start' - for start

## How to use (old fassion way)

1. Place mp3's in to /misc/sounds
2. Place mp4`s in to /misc/videos
3. create .env file: use example.env - then rename it to '.env', also you can tune coins there, viwers gets coins per post - chat message
4. npm start
5. add to OBS Browser Source: http://localhost:3000/audio.html and http://localhost:3000/video.html
6. !list PogChamp

## Generate Twitch OAUTH

1. Go here: https://twitchtokengenerator.com
2. You need Bot OAUTH
3. Login and get it

## FAQ

>Q: Aplication is runing but i can't see my alerts?

>A: You need to start OBS after bot or use refresh function(or add autorefresh on switch scenes) in brouwser source item, otherwise - OBS with load empty HTML's.

>Q: I found a bug?

>A: Please open an issue on Github.

>Q: I can't get it running?

>A: You an early adopber, it's normal, just make sure that you done steps correctly, then open an Issue on Github.

>Q: Starting this thing is too complicated.

>A: It's solvable with .bat or VB script, but i don't know how, alse you can learn PowerShell a little bit better with 'cd dir*' and other shortcuts or add to windows 'path'.

>Q: I wanna have infinity ammo!

>A: database is in db.json, just add any value, just be sure that it's still a number value.

*****

It's just a fun project for learning, but if you interesting at supporting me you can do it here: https://streamlabs.com/teoreez
I will try to add more features to this project ASAP.

My other projects(russian lang):

My twitch: https://www.twitch.tv/teoreez (livestreaming)

Youtube: https://www.youtube.com/channel/UCdJjp2IZ7Qs6k_Z6pM95uGQ (videos about game mechanics, gametheory and gamedev)

Instagram: https://www.instagram.com/teoreez/ (fun design stuff)

Thanks @kritzware and @KoaTeam for creating great powerfull tools!
