const User = require('../models/partiDejeux.model').User;
const mongoose = require('mongoose');

exports.userDQueries = class{

    // static setUser(data){
    //     return new Promise(async next =>{
    //         const user = await new User({
    //             name:data.name,
    //             password: data.password
    //         });
    //         user.save().then(user=>{
    //             next({etat:true,user:user});
    //         }).catch(e => {
    //             next({etat:false,err:e});
    //         });
    //     });
    // }

    static getUser(data){
        return new Promise(async next =>{
            await mongoose.connection.db.collection('memory_usergame',(err,collection)=>{
                collection.findOne({
                    nom:data.name,
                    password:data.password
                }).then(user=>{
                    next({etat:true,user:user});
                }).catch(e => {
                    next({etat:false,err:e});
                });
            })
          /*  User.findOne({
                name:data.name,
                password:data.password
            }).then(user=>{
                next({etat:true,user:user});
            }).catch(e => {
                next({etat:false,err:e});
            }); */
        });
    }
};

