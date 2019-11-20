const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/Game2',{
            useNewUrlParser:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log('connected to mongodb');
    }catch(e){
        console.log("err"+e);
    }
};

module.exports = connection;