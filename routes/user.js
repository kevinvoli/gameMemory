const express = require('express');
const router = new express.Router();

const {gameQueries} = require('../controllers/game.controller');
const {gameDQueries} = require('../controllers/gameD.controller');
const {userDQueries} = require('../controllers/userD.controller');
const {functions} = require('../controllers/random');


let compt = 0;
router.route('/user-register')
    .get((req,res)=>{
       res.render('user_register');
    });

router.route('/')
    .get((req,res)=>{
        res.render('user_login');
    });


router.route('/set-game')
    .get((req,res)=>{
        res.render('set-game')
    });

router.route('/nan_games/games')
    .get( async (req,res)=>{
        if(req.session.game){
            const user = req.session.game;
            const resu = await gameQueries.getAllGame();
            res.render('game_index',{user:user,game:resu.games});
        }else{
            res.redirect('/');
        }
    });
router.route('/deconnexion')
    .get(async (req,res)=>{
        delete req.session.game;
        req.session.save();
        res.redirect('/nan_games/games')
    });

router.route('/nan_games/games/:id')
    .get(async (req,res)=>{
        compt += 1;
        if(req.session.game) {
            const result = await gameQueries.getGame(req.params.id);
            if(verifIdGame(req.session.game.games,resu.game._id)){
                res.redirect('/nan_games/games')
            }else{
                res.render('game', {user:req.session.game,game: result.game});
            }

        }
        else
            res.redirect('/');
    });

router.route('/game2')
    .get(async(req,res)=>{
        if (req.session.user) {
            res.render('game2',{user:req.session.user,jeux:req.session.jeux});
        } else {
            res.redirect('/connection')
        }
    });

const verifIdGame = (tab,game) => {
    let verif = false;
    tab.forEach(el => {
       el.id_game.toString() === game.toString() ? verif = true : '';
    });
    return false;
};

router.route('/admin')
.get((req,res)=>{
    res.render('admin')
})

router.route('/connect-admin')
.get((req,res)=>{
    res.render('connection')
})

router.route('/connect-admin')
.post((req,res)=>{
    res.redirect('/admin')
})


router.route('/admin')
.post(async(req,res)=>{
    console.log(req.body)
    if(req.body.type==='1'){
     res.send("jeux pas disponible")
    }else{
        console.log(req.body)
      
        let data={
            nom:req.body.nom,
            nbcareau:req.body.nbcaro,
            nbniveau:req.body.niveau,
            description:req.body.description,
            dure:req.body.dure,
            dateDebut:req.body.debut,
            dateFin:req.body.fin,
        }

        let creeJeux=await  gameDQueries.setGame(req.body)
        req.session.jeux=creeJeux
     
        res.redirect('/connection')
    }

})

router.route('/connection')
.get((req,res)=>{
    
    res.render('connection')
})
router.route('/connection')
.post(async(req,res)=>{

    console.log(req.body)
    let data={
        name:req.body.nom,
        password:req.body.password
    }
    const result = await userDQueries.getUser(data);
    if(result.etat===false){
res.render('connection')
    }
    else{
        req.session.user=result.user
        console.log("tait connecte",req.session.user)

        res.redirect('/game2')
    }    
})

router.route('/connect-admin')
.get((req,res)=>{  
    res.render('connection')
})

router.route('/connect-admin')
.post((req,res)=>{  
    res.redirect('/admin')
})

router.route('/register')
.get((req,res)=>{
    res.render('register')
})
router.route('/register')

.post(async(req,res)=>{
  
    let data={
        name:req.body.nom,
        password:req.body.password
    }
    console.log(data)
    const result = await userDQueries.setUser(data);
    console.log("serulttar",data)

    res.redirect('/connection')
})

module.exports = router;