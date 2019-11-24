const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect('mongodb://51.77.197.177:27017/candidaturenan',{
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log('connected to mongodb');

    //   mongoose.connection.db.collection('memory_image_resultat',(err,collection)=>{
    //         collection.deleteMany().then((err,jeux)=>{
    //             console.log('ici BD',jeux)
    //         })
    //     })
    // mongoose.connection.db.collection('memory_levelgame',(err,collection)=>{
    //     collection.find().toArray((err,niveau)=>{
    //         console.log("BASE",niveau)
    //     })
    // })
    }catch(e){
        console.log("err"+e);
    }
};

module.exports = connection;