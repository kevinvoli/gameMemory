const mongoose = require('mongoose');
const relationship = require("mongoose-relationship")


SchemaUsers= new mongoose.Schema({
    name:{type:String},
    password: {type:String,require:true}
    
  })
 
  SchemaJeuxCree= new mongoose.Schema({
      nom:{type: String},
      nbcareau:{type: String, default:''},
      nbniveau:{type: String, default:''},
      description:{type: String, default:''},
      dure:{type:String},
      nombreNiveau:{type:String},
      dateDebut:{type:Date},
      dateFin:{type:Date},
      Score:[{ type:mongoose.Schema.ObjectId, ref:'jeux-ref' }],
  })

  SchemaJeux= new mongoose.Schema({
    name:{type:String},
    debut:{type:Date},
    duree:{type:Date},
    nclick:{type:String},
    niveau: {type:String},
    Users: { type:mongoose.Schema.ObjectId, ref:"User" },
  
  })
  
  exports.User= mongoose.model('User',SchemaUsers) 
  
//   SchemaJeuxCree.plugin(relationship,{relationshipPathName:'Score' })
  exports.JeucCree=mongoose.model('jeuxCree-ref',SchemaJeuxCree)

//   SchemaJeux.plugin(relationship,{relationshipPathName:'Users'})
  exports.Jeux=mongoose.model('jeux-ref',SchemaJeux)