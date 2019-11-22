const mongoose = require('mongoose');


SchemaUsers= new mongoose.Schema({
    name:{type:String},
    password: {type:String,require:true}
    
  })
 
  SchemaJeuxCree= new mongoose.Schema({
      nom:{type: String},
      nbcareau:{type: Number, default:''},
      estadmin:{type:Number,required:true},
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
    debut:{type:Date,default: new Date},
    fin:{type:Date},
    admis:{type: Boolean, default:false},
    nclick:{type:Number},
    niveau: {type:Number},
    niveaufinal:{type:Number},
    Users: { type:mongoose.Schema.ObjectId, ref:"User" },
    Jeux:{type:mongoose.Schema.ObjectId, ref:'jeuxCree-ref'}
  })
  
  exports.User= mongoose.model('User',SchemaUsers) 
  

  exports.JeucCree=mongoose.model('jeuxCree-ref',SchemaJeuxCree)


  exports.Jeux=mongoose.model('jeux-ref',SchemaJeux)