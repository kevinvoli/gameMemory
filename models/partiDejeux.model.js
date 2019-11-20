const mongoose = require('mongoose');

const PartiJeux = new mongoose.Schema({
    name:{type:String},
    debut:{type:Date.now},
    duree:{type:Date},
    nclick:{type:String},
    niveau: {type:String},
    joueur:[{type:mongoose.Schema.objectId,ref:'user'}]
    
});

module.exports = mongoose.model('game',PartiJeux);