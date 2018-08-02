var TraInstanciaTramiteObservacionesModel = require('../../model/business/TraEstadoInstanciaObservacionesModel');

module.exports.CreateOrUpdate = function(req, res){
    return TraInstanciaTramiteObservacionesModel.CreateOrUpdate(req.body.Texto, req.body.IdInstanciaTramite, req.body.IdEstadoInstancia, req.body.IdUsuarioAsignado).then(function(result, $filter){
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdObservaciones: element.IdObservaciones,
                        Texto: element.Texto,
                        IdInstanciaTramite: element.FK_IdInstanciaTramite
                    }
                    rtn.push(resultDTO);
                }
            });
        }        
        io.emit("TraInstanciaTramite.Socket_UpdateTraInstanciaGrid", {test:123});
        res.json(rtn);
    });
}

module.exports.Create = function(req, res){
    return TraInstanciaTramiteObservacionesModel.Create(req.body.Texto, req.body.IdInstanciaTramite, req.body.IdEstadoInstancia, req.body.IdUsuarioAsignado).then(function(result, $filter){
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdObservaciones: element.IdObservaciones,
                        Texto: element.Texto,
                        IdInstanciaTramite: element.FK_IdInstanciaTramite
                    }
                    rtn.push(resultDTO);
                }
            });
        }        
        io.emit("TraInstanciaTramite.Socket_UpdateTraInstanciaGrid", {test:123});
        res.json(rtn);
    });
}

module.exports.GetByIdInstanciaTramite = function(req, res){
    return TraInstanciaTramiteObservacionesModel.GetByIdInstanciaTramite(req.params.idInstanciaTramite).then(function(result, $filter){
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdObservaciones: element.IdObservaciones,
                        Texto: element.texto,
                        IdInstanciaTramite: element.FK_IdInstanciaTramite,
                        Fecha: element.Fecha,
                        IdUsuarioAsignado: element.FK_IdUsuarioAsignado,
                        Username: element.Username,
                        Email: element.Email
                    }
                    rtn.push(resultDTO);
                }
            });
        }        
        io.emit("TraInstanciaTramite.Socket_UpdateTraInstanciaGrid", {test:123});
        res.json(rtn);
    });
}

module.exports.Notify = function(req, res){

    if(req.params.idUsuarioAsignado){
        io.emit("TraEstadoInstanciaObservaciones.Notify", {IdUsuarioAsignado:req.params.idUsuarioAsignado, IdTramiteInstancia: req.params.idTramiteInstancia});
    }
    else{
        io.emit("TraEstadoInstanciaObservaciones.Notify", {IdUsuarioAsignado:null});
    }
}

