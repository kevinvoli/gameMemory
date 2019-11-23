const mongoose= require('mongoose')

exports.levelQueries= class{
     static getAllLevel(){
        return new Promise(async next => {
            await mongoose.connection.db.collection('memory_levelgame',(err,collection)=>{
                collection.find().toArray((err,level)=>{
                    if (err) {
                        next({etat:false,level:err})
                    }else{
              
                        if (game.length>0) {
                        next({etat:true,level:level,id:level})
                        }else{
                            next({etat:false,level:level})
                        }
                       
                    }
                })
            })
            await mongoose.connection.co
            Game.find().to(game=>{
                next({etat:true,game:game});
            }).catch(e => {
                next({etat:false,err:e});
            })
        });
    }
}