const mongoose = require('mongoose');
const Game = require('../models/partiDejeux.model').Jeux;

exports.partiQueries = class{

    static setGame(data, id,dure,idNewGame){
        console.log(id)
        return new Promise(async next =>{
            await mongoose.connection.db.collection('memory_image_resultat',(err,game)=>{
                game.insert({
                    id:idNewGame+1,
                    user_id:id,
                    game_id:data,
                    debut_game:new Date(),
                    date_fin:Math.round(new Date().getTime()/1000)+dure,
                    nombre_click:0,
                    niveaux:1,
                    niveaux_valide:0.0,
                    a_valide:false,
                    pourccentage:0,
                    date_add:new Date(),
                    date_udp:new Date(),
                    status: true
                }).then(game=>{
                    next({etat:true,game:game.ops[0]});
                }).catch(e => {
                    next({etat:false,err:e});
                });
            })
    
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
                collection.findOne({user_id:data}).then(game=>{
                    if (game!==null) {
                        next({etat:true,game:game});
                    }
                    next({etat:false,game:'user non valide'});
                }).catch(e => {
                    next({etat:false,err:e});
                })
            })
        
        });
    }

    static getAllGame(){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_image_resultat',(err,collection)=>{
                collection.find().toArray((err,game)=>{
                    if (err) {
                        next({etat:false,game:err})
                    }else{
              
                        if (game.length>0) {
                        next({etat:true,game:game,id:game[game.length-1].id})
                        }else{
                            next({etat:true,id:0})
                        }
                       
                    }
                
                })
            })
        
        });
    }
    static updateGame(niveau,click,data){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_image_resultat',(err,collection)=>{
                collection.update({"id":data},{$set:{"nombre_click":click,"niveaux":niveau, 'niveaux_valide':niveau-1}}).then(jeux=>{   
                    jeux.save()
                    }).catch(e => {
                        next({etat:false,err:e});
                    })
            })  
            });
        }
    static updateClickGame(data,click){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_image_resultat',(err,collection)=>{
                collection.update({"id":data},{$set:{"nombre_click":click}}).then(jeux=>{   
                    jeux.save()
                }).catch(e => {
                    next({etat:false,err:e});
                })
            })
              
            });
        }
    static updateAdminGame(data){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_image_resultat',(err,collection)=>{
                collection.update({"id":data},{$set:{"admis":true}}).then(jeux=>{   
                    jeux.save()
                }).catch(e => {
                    next({etat:false,err:e});
                })
            })
            });
        }

};