const server = require('./server');
const serveur = new server();
const app = serveur.getApp();
let bodyParser = require('body-parser')
const db = require('./settings/database');
const http = require('http').createServer(app);

const {userQueries} = require('./controllers/user.controller');
const {gameQueries} = require('./controllers/game.controller');
const {functions} = require('./controllers/random');
const memoryGame = require('./docs/jeuximages');

db();

const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


const home = io.of('/');
home.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('next',(data)=>{
        socket.emit('next',data);
    })
});


const register = io.of('/user-register');
register.on('connection',(socket)=>{
   console.log('user connected');
   socket.on('user-register', async (data)=>{
       const resu = await userQueries.setUser(data);
       if(resu.user!= null){
           socket.emit('user-register',resu.user);
       }
   })
});

const login = io.of('/user-login').use(serveur.getSharedSession());
login.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('user-login', async (data)=>{
        const resu = await userQueries.getUser(data);
        if(resu.user!= null){
            socket.handshake.session.game = resu.user;
            socket.handshake.session.save();
            socket.emit('user-login');
        }else{
            socket.emit('user-not-found');
        }
    })
});

const game = io.of('/nan_games/games').use(serveur.getSharedSession());
game.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('begin_game', async (data)=>{
        const resu = await userQueries.setGame(data);
        if(resu.user != null){
            if(resu.etat === "ok"){
                console.log(resu.etat);
                socket.handshake.session.game = resu.user;
                socket.handshake.session.save();
            }
            socket.emit('begin_game',data);
        }
    })
});

const memory = io.of('/nan_games/games/memory').use(serveur.getSharedSession());
memory.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('begin_game_memory',async ()=>{
        const res = await gameQueries.getLevel(0);
        if(res.level != null){
            socket.emit('begin_game_memory',res.level);
        }
    });

    socket.on('passlevel',async (game_id,niveau)=>{
        console.log(game_id+''+niveau);
        const data = {
            user_id: socket.handshake.session.game._id,
            game_id: game_id,
            niveau: niveau
        };
        const res = await userQueries.passLevel(data);
        if(res.game != null){
            console.log(res.game);
            socket.emit('passlevel',res.game);
        }
    });


    socket.on('setTentative',async (game_id,niveau)=>{
        console.log(game_id+''+niveau);
        const data = {
            user_id: socket.handshake.session.game._id,
            game_id: game_id,
            niveau: niveau
        };
        const res = await userQueries.setNumberTentatives(data);
        if(res.game != null){
            socket.emit('setTentative',res.game);
        }
    });
});

// memeory 2 //
const images = [
    "mini1.png",
    "mini2.png",
    "mini3.png",
    "mini4.png",
    "mini5.png",
    "mini6.png",
    "mini7.png",
    "mini8.png",
];
let minut;
let nclick
let texte='il vous reste moins de cinq minutes'
let info = {},Images = [],resu = [];
const memory2 = io.of('/game2').use(serveur.getSharedSession());
memory2.on('connection',(socket)=>{
    console.log('user connected');
    socket.on('startgame',()=>{

        if( socket.handshake.session.temp || socket.handshake.session.score ){
            minut=socket.handshake.session.temp-Math.round(new Date().getTime()/1000)
            nclick=socket.handshake.session.click
            info= socket.handshake.session.score
        }else{
            socket.handshake.session.temp =  Math.round(new Date().getTime()/1000)+305;
            socket.handshake.session.save();
            nclick=0
            minut=socket.handshake.session.temp-Math.round(new Date().getTime()/1000)
            info = memoryGame.niveaux[0];
            console.log(info);
        }
        Images = functions.setImage(images,info.nBimage);
        resu = functions.random(Images,info.params);
        socket.emit('startgame',resu,info,minut,nclick,texte);
    });
    socket.on('gameHover',()=>{
        delete socket.handshake.session.temp
        delete socket.handshake.session.score
        delete socket.handshake.session.click
        socket.handshake.session.save()
        socket.emit('gameHover','http://localhost:3000/')
    })
  
    socket.on('gesTemp',(data)=>{
        minut=data
    })
    
   

    socket.on('nextlevel',(data,click)=>{
        socket.handshake.session.click = click
        socket.handshake.session.save()
        nclick+= socket.handshake.session.click

        info = memoryGame.niveaux[data];
        socket.handshake.session.score = info
        socket.handshake.session.save()
        Images = functions.setImage(images,info.nBimage);
        resu = functions.random(Images,info.params);
        socket.emit('nextlevel',resu,info);
    });
});
http.listen(3000,()=>{
    console.log("j'écoute sur le port 3000");
});