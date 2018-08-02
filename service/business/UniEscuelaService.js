var UniEscuelaModel = require('../../model/business/UniEscuelaModel.js');

module.exports.GetAll = function(req, res){

    return UniEscuelaModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var uniEscuelaDTO = {
                        Codigo : element.Codigo,
                        Nombre : element.Nombre,
                        Nivel : element.Nivel,
                        HabilitaInscripcion : element.HabilitaInscripcion,
                        Publicar : element.Publicar,
                        FacultadId : element.FacultadId,
                        Tipo : element.Tipo,

                        ModalidadList : []
                    }
                    rtn.push(uniEscuelaDTO);
                }
            });
        }

        res.json(rtn);
    });
}