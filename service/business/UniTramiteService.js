var UniTramiteModel = require('../../model/business/UniTramiteModel.js');

module.exports.GetAll = function(req, res){

    return UniTramiteModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var tramiteDTO = {
                        NroTramite: element.NroTramite,
                        NombreTramite: element.NombreTramite,
                        NombreTarea: element.NombreTarea,
                        Prioridad: element.Prioridad,
                        Estado: element.Estado,
                        FechaCreacion: element.FechaCreacion,
                        FechaLimite: element.FechaLimite,
                        Asignado: element.Asignado,
                        Tipo: element.Tipo,
                        TareaTipo: element.TareaTipo
                    }
                    rtn.push(tramiteDTO);
                }
            });
        }

        res.json(rtn);
    });
}