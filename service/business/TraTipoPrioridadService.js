var TraTipoPrioridadModel = require('../../model/business/TraTipoPrioridadModel');

module.exports.GetAll = function(req, res){

    return TraTipoPrioridadModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdTipoPrioridad : element.IdTipoPrioridad,
                        Descripcion : element.Descripcion
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}