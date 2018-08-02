var TraInstanciaTramiteModel = require('../../model/business/TraInstanciaTramiteModel');
var UniAlumnoModel = require('../../model/business/UniAlumnoModel.js');
var fileManager = require('../../model/external/fileManager.js');
var TraTramiteModel = require('../../model/business/TraTramiteModel');

module.exports.GetAll = function(req, res){

    return TraInstanciaTramiteModel.GetAll().then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdInstanciaTramite : element.IdInstanciaTramite,
                        IdInstanciaTramiteActivo: element.IdInstanciaTramiteActivo,
                        IdTramite : element.FK_IdTramite,
                        FechaComienzo : element.FechaComienzo,
                        FechaFin : element.FechaFin,
                        IdentificadorInteresado : element.IdentificadorInteresado
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.Create = function(req, res){

    return TraInstanciaTramiteModel.Create(req.body).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdInstanciaTramite : element.IdInstanciaTramite,
                        IdTramite : element.FK_IdTramite,
                        FechaComienzo : element.FechaComienzo,
                        FechaFin : element.FechaFin,
                        IdentificadorInteresado : element.IdentificadorInteresado,
                        Prioridad : element.Prioridad
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}

module.exports.Update = function(req, res){

    return TraInstanciaTramiteModel.Update(req.body).then(function(result, $filter){
        
        var rtn = [];
        if(result.recordset){
            result.recordset.forEach(element => {
                
                if(element){
                    // Se arma el DTO
                    var resultDTO = {
                        IdInstanciaTramite : element.IdInstanciaTramite,
                        IdTramite : element.FK_IdTramite,
                        FechaComienzo : element.FechaComienzo,
                        FechaFin : element.FechaFin,
                        IdentificadorInteresado : element.IdentificadorInteresado,
                        Prioridad : element.Prioridad
                    }
                    rtn.push(resultDTO);
                }
            });
        }

        res.json(rtn);
    });
}




module.exports.GetEdificioByInstanciaTramite = function(req, res){
    
        TraInstanciaTramiteModel.GetEdificioByInstanciaTramite(req.params.idInstanciaTramite)
        .then(result => {
            var rtn = null;
            if(result.recordset.length){
    
                rtn = {
                    ValoresSalida: result.recordset[0].ValoresSalida,
                }
            }
            res.json(rtn);
        });
}


module.exports.GetTramiteInstanciaByLegajo = function(req, res){
    
    return TraInstanciaTramiteModel.GetTramiteInstanciaByLegajo(req.params.legajo, req.params.idUsuario).then(function(result, $filter){
        
        var rtn = [];
        var sizeResult = 0;
        var pivotResult = 0;
        if(result.recordset){
            sizeResult=result.recordset.length;
            if (sizeResult==0){
                res.json(rtn);
            }
            result.recordset.forEach(element => {
                var FechaFinalizacionEstimadaAux=0;
                TraInstanciaTramiteModel.GetDuracionEstimadoTramite(element.IdTramiteDef).then(function(result, $filter){
                    FechaFinalizacionEstimadaAux=result.recordset[0].DuracionLimiteTarea;
                    if(element){
                        // Se arma el DTO
                        var resultDTO = {
                            IdTramite : element.IdTramite,
                            Nombre : element.Nombre,
                            Descripcion: element.Descripcion,
                            IdentificadorInteresado : element.IdentificadorInteresado,
                            IdInstanciaTramite : element.IdInstanciaTramite,
                            IdInstanciaTramiteActivo : element.IdInstanciaTramiteActivo,
                            FechaComienzo : element.FechaComienzo,
                            FechaFinalizacionEstimada : FechaFinalizacionEstimadaAux,
                            FechaFin : element.FechaFin,
                            NombreEstadoParaAlumno: element.nombreEstadoParaAlumno,
                            EstadoEstado: element.EstadoEstado,
                            IdEstadoInstancia: element.IdEstadoInstancia,
                            ValoresEntrada: element.ValoresEntrada,
                            ValoresSalida: element.ValoresSalida
                        }
                        pivotResult++;
                        rtn.push(resultDTO);
                        if (sizeResult==pivotResult){
                            res.json(rtn);
                        }
                    }
                });
            });
        }
    });
}

var generateDirectories = function (idTramiteActivo, username, idInstanciaTramite, method) {

    return TraInstanciaTramiteModel.GetByIdInstanciaTramite(idInstanciaTramite)
        .then(result => {
            if (result.recordset) {
                var idTramite = result.recordset[0].FK_IdTramite;

                TraTramiteModel.GetAll()
                    .then(result => {
                        if (result.recordset) {
                            getTramite = function (tramite) {
                                return tramite.IdTramite == this;
                            }
                            var nombreTramite = result.recordset.find(getTramite, idTramite).Nombre;

                            UniAlumnoModel.GetAlumnoByUsername(username)
                                .then(result => {
                                    if (result.recordset.length) {
                                        var getListTramiteFolder = function () {
                                            fileManager.GetList('/' + userFolder + '/' + nombreTramite)
                                                .then(result => {
                                                    var found3 = false;
                                                    if (result.result) {
                                                        result.result.forEach(element => {
                                                            if (element.name == idTramiteActivo && element.type == 'dir' && !found3) {
                                                                found3 = true;
                                                                method('/' + userFolder, '/' + userFolder + '/' + nombreTramite + '/' + idTramiteActivo);
                                                            }
                                                        });
                                                    }
                                                    if (!found3) {
                                                        fileManager.CreateFolder('/' + userFolder + '/' + nombreTramite + '/' + idTramiteActivo)
                                                            .then(result => {
                                                                method('/' + userFolder, '/' + userFolder + '/' + nombreTramite + '/' + idTramiteActivo);
                                                            });
                                                    }
                                                });
                                        }

                                        var getListUserFolder = function () {
                                            fileManager.GetList('/' + userFolder)
                                                .then(result => {
                                                    var found2 = false;
                                                    if (result.result) {
                                                        result.result.forEach(element => {
                                                            if (element.name == nombreTramite && element.type == 'dir' && !found2) {
                                                                found2 = true;
                                                                getListTramiteFolder();
                                                            }
                                                        });
                                                    }
                                                    if (!found2) {
                                                        fileManager.CreateFolder('/' + userFolder + '/' + nombreTramite)
                                                            .then(result => {
                                                                getListTramiteFolder();
                                                            });
                                                    }
                                                });
                                        }

                                        var idEntidad = result.recordset[0].IdEntidad;
                                        var doc = result.recordset[0].docnac;
                                        var userFolder = (doc != null ? doc : 'x') + '_' + idEntidad;
                                        fileManager.GetList('/')
                                            .then(result => {
                                                var found = false;
                                                if (result.result) {
                                                    result.result.forEach(element => {
                                                        if (element.name == userFolder && element.type == 'dir' && !found) {
                                                            found = true;
                                                            getListUserFolder();
                                                        }
                                                    });
                                                }
                                                if (!found) {
                                                    fileManager.CreateFolder('/' + userFolder)
                                                        .then(result => {
                                                            getListUserFolder();
                                                        });
                                                }
                                            });
                                    }
                                });
                        }
                    });
            }
        });


}

module.exports.UpdateDatosPhotos = function (req, res) {
    var idInstanciaTramite = req.body.idInstanciaTramite;
    var idTramiteActivo = req.body.idInstanciaTramiteActivo;
    var username = req.body.username;
    var attachData = req.body.attachData;

    var method = function (userDir, tramiteDir) {
        res.json(true)
    }

    return generateDirectories(idTramiteActivo, username, idInstanciaTramite, method);
}

module.exports.UploadMateriasPhotos = function (req, res) {
    var idInstanciaTramite = req.body.idInstanciaTramite;
    var idTramiteActivo = req.body.idInstanciaTramiteActivo;
    var username = req.body.username;
    var listaMaterias = req.body.listaMaterias;

    var method = function (userDir, tramiteDir) {
        var recursiveUpload = function (index = 0) {
            if(index < listaMaterias.length) {
                var materiaName = ((listaMaterias[index].Materia.trim()).replace(" ", "_")).toLowerCase();
                fileManager.Upload(listaMaterias[index], tramiteDir, materiaName)
                .finally(function() {
                    recursiveUpload(index + 1);
                })
            } else {
                res.json(true);
            }
        }
        recursiveUpload();
    }

    return generateDirectories(idTramiteActivo, username, idInstanciaTramite, method);
}

module.exports.GetByIdInstanciaTramite = function(req, res){
    
    TraInstanciaTramiteModel.GetByIdInstanciaTramite(req.params.idInstanciaTramite)
    .then(result => {
        var rtn = null;
        if(result.recordset.length){

            rtn = {
                FechaComienzo: result.recordset[0].FechaComienzo,
                FechaFin: result.recordset[0].FechaFin,
                IdTramite: result.recordset[0].FK_IdTramite,
                IdentificadorInteresado: result.recordset[0].IdentificadorInteresado,
                IdInstanciaTramite: result.recordset[0].IdInstanciaTramite,
                IdInstanciaTramiteActivo: result.recordset[0].IdInstanciaTramiteActivo,
                Prioridad: result.recordset[0].Prioridad
            }
        }
        res.json(rtn);
    });
}


module.exports.CreateDirectory = function (req, res) {
    var idInstanciaTramite = req.body.idInstanciaTramite;
    var idTramiteActivo = req.body.idInstanciaTramiteActivo;
    var username = req.body.username;

    TraInstanciaTramiteModel.GetByIdInstanciaTramite(idInstanciaTramite).then(result => {
        if (result.recordset) {
            var idTramite = result.recordset[0].FK_IdTramite;

            TraTramiteModel.GetAll().then(result => {
                if (result.recordset) {
                    getTramite = function (tramite) {
                        return tramite.IdTramite == this;
                    }
                    var nombreTramite = result.recordset.find(getTramite, idTramite).Nombre;

                    UniAlumnoModel.GetAlumnoByUsername(username).then(result => {
                        if (result.recordset.length) {
                            var getListTramiteFolder = function () {
                                fileManager.GetList('/' + userFolder + '/' + nombreTramite).then(result => {
                                    var found3 = false;
                                    if (result.result) {
                                        result.result.forEach(element => {
                                            if (element.name == idTramiteActivo && element.type == 'dir' && !found3) {
                                                found3 = true;
                                                var rtn = {
                                                    userFolder: '/' + userFolder,
                                                    tramiteFolder: '/' + userFolder + '/' + nombreTramite + '/' + idTramiteActivo
                                                }

                                                res.json(rtn);
                                            }
                                        });
                                    }
                                    if (!found3) {
                                        fileManager.CreateFolder('/' + userFolder + '/' + nombreTramite + '/' + idTramiteActivo).then(result => {
                                            var rtn = {
                                                userFolder: '/' + userFolder,
                                                tramiteFolder: '/' + userFolder + '/' + nombreTramite + '/' + idTramiteActivo
                                            }

                                            res.json(rtn);
                                        });
                                    }
                                });
                            }

                            var getListUserFolder = function () {
                                fileManager.GetList('/' + userFolder).then(result => {
                                    var found2 = false;
                                    if (result.result) {
                                        result.result.forEach(element => {
                                            if (element.name == nombreTramite && element.type == 'dir' && !found2) {
                                                found2 = true;
                                                getListTramiteFolder();
                                            }
                                        });
                                    }
                                    if (!found2) {
                                        fileManager.CreateFolder('/' + userFolder + '/' + nombreTramite).then(result => {
                                            getListTramiteFolder();
                                        });
                                    }
                                });
                            }

                            var idEntidad = result.recordset[0].IdEntidad;
                            var doc = result.recordset[0].docnac;
                            var userFolder = (doc != null ? doc : 'x') + '_' + idEntidad;
                            fileManager.GetList('/').then(result => {
                                var found = false;
                                if (result.result) {
                                    result.result.forEach(element => {
                                        if (element.name == userFolder && element.type == 'dir' && !found) {
                                            found = true;
                                            getListUserFolder();
                                        }
                                    });
                                }
                                if (!found) {
                                    fileManager.CreateFolder('/' + userFolder).then(result => {
                                        getListUserFolder();
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}