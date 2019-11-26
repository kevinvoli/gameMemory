const server = require('./server');
const serveur = new server();
const app = serveur.getApp();
let bodyParser = require('body-parser')
const db = require('./settings/database');
const http = require('http').createServer(app);

const {userQueries} = require('./controllers/user.controller');
const {gameQueries} = require('./controllers/game.controller');
const {functions} = require('./controllers/random');

const {gameDQueries} = require('./controllers/gameD.controller');
const {partiQueries} = require('./controllers/PartiGame.controller');
const {levelQueries} = require('./controllers/level.controller');


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
   console.log('enregistre toi')
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

let parametre
let temps

let nclick
let index
let texte='il vous reste moin de 3 minu'
let info = {},Images = [],resu = [];

const memory2 = io.of('/game2').use(serveur.getSharedSession());
memory2.on('connection',async(socket)=>{
    let jeuxCree= await gameDQueries.getGameOne('Memory Image')
   let listLevel= await levelQueries.getAllLevel()
   parametre=listLevel.level

   console.log("ICI SONT STOQUET LES NIVEAU",  jeuxCree)
    console.log("ICI SONT STOQUET LES NIVEAU",  parametre[0])

    let dure = jeuxCree.game.duree_game.split(':')
    let duree= parseInt(dure[0])*60 + parseInt(dure[1]) +parseInt(dure[2]/60)

    console.log('tu est la quoi zooo',jeuxCree)
    console.log('tu est la quoi zooo',duree)
    let liste = await partiQueries.getAllGame()
    let indexGame=liste.id

    console.log('QQQDSDD',indexGame)

    if(socket.handshake.session.user){
        let verif= await partiQueries.getOneGame(socket.handshake.session.user.id)
        console.log('verifition de l user',verif)

        socket.on('startgame',async()=>{
           
            if( socket.handshake.session.temp || socket.handshake.session.Jeux ){
                console.log("OUI JE VOIT",socket.handshake.session.Jeux)
                let time=(verif.game.date_fin.getTime()-new Date().getTime())/1000
                socket.handshake.session.temp = functions.gettimes(time)
                temps=socket.handshake.session.temp
                nclick=socket.handshake.session.click
                info = parametre[verif.game.niveaux];
                console.log("OUI JE VOIT",temps)
            }else{
                if (verif.etat!==false) {
                    console.log('une foi de plus sa passe',)
                    socket.handshake.session.Jeux=verif.game
                    socket.handshake.session.save();
                    console.log('la session du jeux',socket.handshake.session.Jeux)
                     let time=(verif.game.date_fin.getTime()-new Date().getTime())/1000
                     socket.handshake.session.temp = functions.gettimes(time)
                    console.log('leTEMPSS',socket.handshake.session.temp )
                    socket.handshake.session.save();     
                    nclick=verif.game.nombre_click
                    temps=socket.handshake.session.temp
                    info = parametre[verif.game.niveaux];
                }else{

                    console.log("ICI C;EST LE TEMPS",socket.handshake.session.user.id)
                    let nouveauJeux= await partiQueries.setGame(jeuxCree.game.id,socket.handshake.session.user.id,duree,indexGame)
                    socket.handshake.session.Jeux=nouveauJeux.game
                    console.log(nouveauJeux)
                    let time= (socket.handshake.session.Jeux.date_fin.getTime()-new Date().getTime())/1000
                    socket.handshake.session.temp =functions.gettimes(time)
                    socket.handshake.session.save();
                    nclick=0
                    temps=socket.handshake.session.temp
                        parametre.forEach(niveaux=>{
                            if (niveaux.nbCase==jeuxCree.game.nombre_careaux){
                                console.log(niveaux.niveau);
                                index =  niveaux.niveau
                            }
                        })
                    info = parametre[0];
                }
            }
            console.log(temps)
           
            Images = functions.setImage(images,info.nBimage);
            resu = functions.random(Images,info.params);
            socket.emit('startgame',resu,info,temps,nclick,texte);
        });
        socket.on('gameHover',()=>{
            delete socket.handshake.session.temp
            delete socket.handshake.session.score
            delete socket.handshake.session.click
            delete socket.handshake.session.Jeux
            socket.handshake.session.save()
            socket.emit('gameHover','http://localhost:3000/')
        })
        socket.on('updateclick',async(click)=>{
            await  partiQueries.updateClickGame(socket.handshake.session.Jeux.id,click)
        })
        socket.on('gesTemp',(data)=>{
            minut=data
        })
        let validee=jeuxCree.game.estadmin
         let valid=0
        socket.on('nextlevel',async(data,click)=>{
        console.log('nexte level',data)
        console.log("MES DATA NEXT ",data)
            await  partiQueries.updateGame(data,click,socket.handshake.session.Jeux.id)
            socket.handshake.session.click = click
            socket.handshake.session.save()
            nclick+= socket.handshake.session.click
            info = parametre[data];
            socket.handshake.session.score = info
            socket.handshake.session.save()
           
            Images = functions.setImage(images,info.nBimage);
            console.log("yayay bosss days", Images)
            resu = functions.random(Images);
            console.log("yayay bosss days AAED", resu)
            console.log("INFO",info)
            
            valid+=1
            socket.emit('nextlevel',resu, info);














            
            if(valid===validee){
                await  partiQueries.updateAdminGame(click,socket.handshake.session.Jeux.id)
            socket.emit('admin')
            }
        });
    }
    });
http.listen(3000,()=>{
    console.log("j'écoute sur le port 3000");
});