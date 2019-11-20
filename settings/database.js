const mongoose = require('mongoose');

const connection = async () =>{
    try{
        await mongoose.connect('mongodb://localhost:27017/NaN_Games?authSource=admin',{
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            user:"admin",
            pass:"mongo123admin"
        });
        console.log('connected to mongodb');
    }catch(e){
        console.log("err"+e);
    }
};

module.exports = connection;