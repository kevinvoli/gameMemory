const mongoose = require('mongoose');
const Game = require('../models/partiDejeux.model').Jeux;

exports.partiQueries = class{

    static setGame(data, id){
        console.log(id)
        return new Promise(async next =>{
            const game = await new Game({
            });
            game.fin= new Date().setMinutes(new Date().getMinutes()+30);
            game.nclick= 0
            game.niveau=1
            game.niveaufinal=(game.niveau-1)
            game.Jeux=data.game._id
            game.Users=id
            game.save().then(user=>{
                next({etat:true,game:game});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }

    static getGame(data){
       return new Promise(async next => {
            Game.findById(data).then(game=>{
                next({etat:true,game:game});
            }).catch(e => {
                next({etat:false,err:e});
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
    static updateGame(niveau,click,data){
        return new Promise(async next => {
                Game.update({"_id":data},{$set:{"nclick":click,"niveau":niveau}}).then(jeux=>{
                
                 jeux.save()
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