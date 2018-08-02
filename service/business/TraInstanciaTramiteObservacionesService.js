var TraInstanciaTramiteObservacionesModel = require('../../model/business/TraInstanciaTramiteObservacionesModel');

module.exports.CreateObservacionOnInstanciaTramite = function(req, res){

    return TraInstanciaTramiteObservacionesModel.Create(req.body.Text, req.body.IdInstanciaTramite).then(function(result, $filter){
        

        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.UpdateObservacionOnInstanciaTramite = function(req, res){

    return TraInstanciaTramiteObservacionesModel.Create(req.body.Text, req.body.IdInstanciaTramite).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.CreateOrUpdate = function(req, res){
    return TraInstanciaTramiteObservacionesModel.CreateOrUpdate(req.body.Texto, req.body.IdInstanciaTramite).then(function(result, $filter){
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
        res.json(rtn);
    });
}
