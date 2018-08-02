var TraCondicionesModel = require('../../model/business/TraCondicionesModel');

module.exports.GetByIdCondiciones = function(req, res){

    return TraArchivoInstanciaTramiteEstadoModel.GetByIdArchivoInstanciaTramiteEstado(req.params.idCondiciones).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdCondiciones : element.IdCondiciones,
                        Nombre : element.Nombre,
                        Descripcion : element.Descripcion,
                        Regla : element.Regla
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}