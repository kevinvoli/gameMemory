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
                        next({etat:true,level:level})
                        }else{
                            next({etat:false,level:level})
                        }
                       
                    }
                })
            })
           
        });
    }
}