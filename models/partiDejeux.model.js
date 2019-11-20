const mongoose = require('mongoose');


SchemaUsers= new mongoose.Schema({
    name:{type:String},
    password: {type:String,require:true}
    
  })
 
  SchemaJeuxCree= new mongoose.Schema({
      nom:{type: String},
      nbcareau:{type: Int32Array, default:''},
      nbniveau:{type: String, default:''},
      description:{type: String, default:''},
      dure:{type:String},
      dateDebut:{type:String},
      dateFin:{type:String},
      image:[{type:mongoose.Schema.ObjectId,ref:'image'}]
  })

  SchemaImage= new mongoose.Schema({
    image:{type: String},
})

  SchemaJeux= new mongoose.Schema({
    debut:{type:Date,default:Date.now() },
    nclick:{type:String},
    niveau: {type:String},
    niveaufinal:{type:String},
    Users: { type:mongoose.Schema.ObjectId, ref:"User" },
    Jeux:{type:mongoose.Schema.ObjectId, ref:'jeuxCree-ref'}
  })
  
  exports.User= mongoose.model('User',SchemaUsers) 
  
//   SchemaJeuxCree.plugin(relationship,{relationshipPathName:'Score' })
  exports.JeucCree=mongoose.model('jeuxCree-ref',SchemaJeuxCree)

//   SchemaJeux.plugin(relationship,{relationshipPathName:'Users'})
  exports.Jeux=mongoose.model('jeux-ref',SchemaJeux)