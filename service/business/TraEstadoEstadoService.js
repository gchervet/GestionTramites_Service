var TraEstadoEstadoModel = require('../../model/business/TraEstadoEstadoModel');

module.exports.GetByIdEstadoEstado = function(req, res){

    return TraEstadoEstadoModel.GetByIdEstadoEstado(req.params.idEstadoEstado).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdEstadoEstado : element.IdEstadoEstado,
                        Nombre : element.Nombre,
                        Descripcion : element.Descripcion
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}