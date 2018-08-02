var TraGrupoUsuariosModel = require('../../model/business/TraGrupoUsuariosModel');

module.exports.GetUsuariosByIdGrupo = function(req, res){

    return TraGrupoUsuariosModel.GetUsuariosByIdGrupo(req.params.idGrupo).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                      IdUsuario : element.IdUsuario,
                      IdGrupo : element.IdGrupo
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetGruposByUsername = function(req, res){

    return TraGrupoUsuariosModel.GetGruposByUsername(req.params.username).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                      IdGrupo : element.IdGrupo,
                      IdUsuario : element.IdUsuario
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetGruposByIdUsuario = function (req, res) {

    return TraGrupoUsuariosModel.getGruposByIdUsuario(req.params.idUsuario).then(function (result, $filter) {

        var rtn = [];
        if (result.recordset) {
            result.recordset.forEach(element => {

                if (element) {
                    // Se arma el DTO
                    var resultDTO = {
                        IdUsuario: element.IdUsuario,
                        IdGrupo: element.IdGrupo
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.GetGrupoAsignadoByUsername = function(req, res){
    return TraGrupoUsuariosModel.GetGrupoAsignadoByUsername(req.params.username).then(function (result, $filter) {

        var rtn = [];
        if (result.recordset) {
            result.recordset.forEach(element => {

                if (element) {
                    // Se arma el DTO
                    var resultDTO = {
                        IdGrupo: element.IdGrupo,
                        NombreGrupo: element.NombreGrupo,
                        IdUsuario: element.IdUsuario,
                        Username: element.Username,
                        Email: element.Email
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.AddAlumnoToGrupoAlumnos = function(req, res){
    return TraGrupoUsuariosModel.AddAlumnoToGrupoAlumnos(req.params.idUsuario).then(function (result, $filter) {

        var rtn = [];
        if (result.recordset) {
            result.recordset.forEach(element => {

                if (element) {
                    // Se arma el DTO
                    var resultDTO = {
                        IdGrupo: element.IdGrupo,
                        NombreGrupo: element.NombreGrupo,
                        IdUsuario: element.IdUsuario,
                        Username: element.Username,
                        Email: element.Email
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}
