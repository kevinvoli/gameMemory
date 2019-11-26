const User = require('../models/partiDejeux.model').User;
const mongoose = require('mongoose');

exports.userDQueries = class{

    static getUser(data){
        return new Promise(async next =>{
            await mongoose.connection.db.collection('memory_usergame',(err,collection)=>{
                collection.findOne({
                    username :data.name,
                    password:data.password
                }).then(user=>{
                    next({etat:true,user:user});
                }).catch(e => {
                    next({etat:false,err:e});
                });
            })
        
        });
    }
};

