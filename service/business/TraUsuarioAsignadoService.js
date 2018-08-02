var TraUsuarioAsignadoModel = require('../../model/business/TraUsuarioAsignadoModel');

module.exports.GetUsuarioInfoByUsername = function(req, res){

    return TraUsuarioAsignadoModel.GetUsuarioInfoByUsername(req.params.username).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdGrupo: element.IdGrupo,
                        NombreGrupo: element.NombreGrupo,
                        Email: element.Email,
                        IdUsuario: element.IdUsuario,
                        IdTipoUsuario: element.IdTipoUsuario,
                        TipoUsuarioDescripcion: element.TipoUsuarioDescripcion                        
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetTipoUsuarioByUsername = function(req, res){

    return TraUsuarioAsignadoModel.GetTipoUsuarioByUsername(req.params.username).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdUsuario: element.IdUsuario,
                        IdTipoUsuario: element.IdTipoUsuario,
                        TipoUsuarioDescripcion: element.TipoUsuarioDescripcion
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}