const mongoose = require('mongoose');
const Game = require('../models/partiDejeux.model').Jeux;

exports.partiQueries = class{

    static setGame(data, id,dure){
        console.log(id)
        return new Promise(async next =>{
            await mongoose.connection.db.collection('memory_image_resultat',(err,game)=>{
                game.date_fin= new Date().setMinutes(new Date().getMinutes()+dure);
                game.nombre_click= 0
                game.niveaux=1
                game.niveaux_valide=(game.niveau-1)
                game.game=data
                game.user=id
                game.save().then(user=>{
                    next({etat:true,game:game});
                }).catch(e => {
                    next({etat:false,err:e});
                });
            })
            // const game = await new Game({
            // });
            // game.fin= new Date().setMinutes(new Date().getMinutes()+dure);
            // game.nclick= 0
            // game.niveau=1
            // game.niveaufinal=(game.niveau-1)
            // game.Jeux=data.game._id
            // game.Users=id
            // game.save().then(user=>{
            //     next({etat:true,game:game});
            // }).catch(e => {
            //     next({etat:false,err:e});
            // });
        });
    }

    static getGame(data){
        return new Promise(async next => {
            await mongoose.connection.co
            Game.findById(data).then(game=>{
                next({etat:true,game:game});
            }).catch(e => {
                next({etat:false,err:e});
            })
        });
    }

    static getOneGame(data){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_image_resultat',(err,collection)=>{
                collection.findOne({User:data}).then(game=>{
                    if (game!==null) {
                        next({etat:true,game:game});
                    }
                    next({etat:false,game:'user non valide'});
                }).catch(e => {
                    next({etat:false,err:e});
                })
            })
            // Game.findOne({Users:data}).then(game=>{
            //     if (game!==null) {
            //         next({etat:true,game:game});
            //     }
            //     next({etat:false,game:'user non valide'});
            // }).catch(e => {
            //     next({etat:false,err:e});
            // })
        });
    }

    static getAllGame(){
        return new Promise(async next => {
            Game.find().populate('Jeux').then(games=>{
                next({etat:true,games:games});
            }).catch(e => {
                next({etat:false,err:e});
            })
        });
    }
    static updateGame(niveau,click,data){
        return new Promise(async next => {
                Game.update({"_id":data},{$set:{"nclick":click,"niveau":niveau, 'niveaufinal':niveau-1}}).then(jeux=>{   
                jeux.save()
                }).catch(e => {
                    next({etat:false,err:e});
                })
            });
        }
    static updateClickGame(data,click){
        return new Promise(async next => {
                Game.update({"_id":data},{$set:{"nclick":click}}).then(jeux=>{   
                    jeux.save()
                }).catch(e => {
                    next({etat:false,err:e});
                })
            });
        }
    static updateAdminGame(data){
        return new Promise(async next => {
                Game.update({"_id":data},{$set:{"admis":true}}).then(jeux=>{   
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