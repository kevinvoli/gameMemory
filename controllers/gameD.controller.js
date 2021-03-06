const mongoose = require('mongoose');
const Game = require('../models/partiDejeux.model').JeucCree;
exports.gameDQueries = class{
 
    static getGame(data){
       return new Promise(async next => {
           await mongoose.connection.db.collection('memory_games',(err,collection)=>{
               collection.findById(data).then(game => {
                    next({etat:true, game:game})
               }).catch(e => {
                next({etat:false,err:e});
            });
          })
         
        });
    }
    static getGameOne(data){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_games',(err,jeux)=>{
                jeux.findOne({nom:data}).then(game=>{
                    next({etat:true,game:game});
                }).catch(e => {
                    next({etat:false,err:e}) ;
                })
            })
        
        });
    }

    

    static getAllGame(){
        return new Promise(async next => {
            Game.find().then(games=>{
                next({etat:true,games:games});
            }).catch(e => {
                next({etat:false,err:e});
            })
        });
    }
    static setLevel(data){
        return new Promise(async next =>{
            const Niveau = {
                niveau: data.niveau,
                nbCase: data.nbCase,
                caseVisible: data.caseVisible,
                tempTransition: data.tempTransition,
                tempAffichage: data.tempAffichage,
                ordre: data.ordre,
                heightDiv: data.heightDiv,
                widthDiv: data.widthDiv
            };
           const game = await Game.findById(data.id);
            game.levels.push(Niveau);
            console.log(game.levels);
            game.save().then(game=>{
                next({etat:true,game:game});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }
    static getLevel(data){
        return new Promise(async next =>{
            Game.find().limit(1).then(games=>{
                next({etat:true,level:games[0].levels[data]});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }
};