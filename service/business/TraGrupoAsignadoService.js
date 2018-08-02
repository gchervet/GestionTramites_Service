var TraGrupoAsignadoModel = require('../../model/business/TraGrupoAsignadoModel');

module.exports.GetByIdInstanciaTramite = function(req, res){

    return TraGrupoAsignadoModel.GetByIdGrupo(req.params.idGrupo).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdInstanciaTramite : element.IdInstanciaTramite,
                        IdEstadoDefinicion : element.IdEstadoDefinicion,
                        IdEstadoInstancia : element.IdEstadoInstancia,
                        FK_IdAsignadoUsuario : element.FK_IdAsignadoUsuario,
                        Comienzo : element.Comienzo,
                        Fin : element.Fin,
                        EstadoEstado : element.EstadoEstado,
                        ValoresEntrada : element.ValoresEntrada,
                        ValoresSalida : element.ValoresSalida
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}