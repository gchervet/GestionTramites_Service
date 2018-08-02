var TraTramiteModel = require('../../model/business/TraTramiteModel');

module.exports.GetAll = function(req, res){

    return TraTramiteModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdTramite : element.IdTramite,
                        Nombre : element.Nombre,
                        Descripcion : element.Descripcion,
                        Prioridad: element.Prioridad
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}