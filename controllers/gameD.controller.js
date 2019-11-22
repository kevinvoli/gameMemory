const mongoose = require('mongoose');
const Game = require('../models/partiDejeux.model').JeucCree;
const User= require('../models/partiDejeux.model').JeucCree
exports.gameDQueries = class{
    static setGame(data){
        console.log(data)
        return new Promise(async next =>{
            const game = await new Game({
                nom:data.nom,
                nbcareau:data.nbcaro,
                estadmin:data.niveau,
                description:data.description,
                dure:data.dure,
                dateDebut:data.debut,
                dateFin:data.fin,
            });
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
    static getGameOne(data){
        return new Promise(async next => {
            Game.findOne({nom:data}).then(game=>{
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