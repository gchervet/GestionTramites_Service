var TraArchivoInstanciaTramiteEstadoModel = require('../../model/business/TraArchivoInstanciaTramiteEstadoModel');

module.exports.GetByIdArchivoInstanciaTramiteEstado = function(req, res){

    return TraArchivoInstanciaTramiteEstadoModel.GetByIdArchivoInstanciaTramiteEstado(req.params.idArchivoInstanciaTramiteEstado).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdAchivoInstanciaTramiteEstado : element.IdAchivoInstanciaTramiteEstado,
                        IdEstadoInstancia : element.IdEstadoInstancia,
                        NombreArchivo : element.NombreArchivo,
                        FechaSubida : element.FechaSubida
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}