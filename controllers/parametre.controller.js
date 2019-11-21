let parametre= require('../docs/jeuximages')

exports.parametreQueries= class{
    static config(data){
     
        parametre.description=data.description
        parametre.duree=data.duree
        parametre.name=data.nom
        

    }
}