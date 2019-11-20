const User = require('../models/partiDejeux.model').User;

exports.userQueries = class{

    static setUser(data){
        return new Promise(async next =>{
            const user = await new User({
                name:data.name,
                password: data.password
            });
            user.save().then(user=>{
                next({etat:true,user:user});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }

    static getUser(data){
        return new Promise(async next =>{
            User.findOne({
                name:data.name,
                password:data.password
            }).then(user=>{
                next({etat:true,user:user});
            }).catch(e => {
                next({etat:false,err:e});
            });
        });
    }
};

