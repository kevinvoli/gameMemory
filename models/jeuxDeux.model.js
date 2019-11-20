const mongoose = require('mongoose');

const jeuxModel = new mongoose.Schema({
    name:{type:String},
    description:{type:String},
    dure:{type:String},
    nombreNiveau:{type:String},
    dateDebut:{type:Date.now},
    dateFin:{type:Date},
    score:[{type:mongoose.Schema.objectId ,ref:'partieDejeux'}],
});

module.exports = mongoose.model('game',jeuxModel);