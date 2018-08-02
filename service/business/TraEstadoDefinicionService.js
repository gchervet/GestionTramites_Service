var TraEstadoDefinicionModel = require('../../model/business/TraEstadoDefinicionModel.js');
var TraGrupoUsuariosModel = require('../../model/business/TraGrupoUsuariosModel.js');

module.exports.GetByIdEstado = function (req, res) {

    var result = TraEstadoDefinicionModel.getByIdEstado(req.params.idEstado);

    var TraEstadoDefinicionDTO = {
              IdEstado: result.IdEstado,
              FK_IdTramite: result.FK_IdTramite,
              FK_IdEstadoSiguiente: result.FK_IdEstadoSiguiente,
              FK_IdAsignadoGrupo: result.FK_IdAsignadoGrupo,
              EstadoVisible: result.EstadoVisible,
              TipoEstado: result.TipoEstado,
              IdPantalla: result.IdPantalla,
              Nombre: result.Nombre,
              Tiempo1Escalabilidad: result.Tiempo1Escalabilidad,
              Tiempo2Escalabilidad: result.Tiempo2Escalabilidad,
              Tiempo3Escalabilidad: result.Tiempo3Escalabilidad,
              FK_Grupo1Escalado: result.FK_Grupo1Escalado,
              FK_Grupo2Escalado: result.FK_Grupo2Escalado,
              FK_Grupo3Escalado: result.FK_Grupo3Escalado,
              FK_IdPreCondicion: result.FK_IdPreCondicion,
              FK_IdPostCondicion: result.FK_IdPostCondicion,
              TipoEstadoNombre: result.TipoEstadoNombre
        
    }

    res.json(TraEstadoDefinicionDTO);
}

module.exports.GetNextEstadoByIdEstado = function (req, res) {

  var result = TraEstadoDefinicionModel.getNextEstadoByIdEstado(req.params.idEstado);

  var TraEstadoDefinicionDTO = {
            IdEstado: result.IdEstado,
            FK_IdTramite: result.FK_IdTramite,
            FK_IdEstadoSiguiente: result.FK_IdEstadoSiguiente,
            FK_IdAsignadoGrupo: result.FK_IdAsignadoGrupo,
            EstadoVisible: result.EstadoVisible,
            TipoEstado: result.TipoEstado,
            IdPantalla: result.IdPantalla,
            Nombre: result.Nombre,
            Tiempo1Escalabilidad: result.Tiempo1Escalabilidad,
            Tiempo2Escalabilidad: result.Tiempo2Escalabilidad,
            Tiempo3Escalabilidad: result.Tiempo3Escalabilidad,
            FK_Grupo1Escalado: result.FK_Grupo1Escalado,
            FK_Grupo2Escalado: result.FK_Grupo2Escalado,
            FK_Grupo3Escalado: result.FK_Grupo3Escalado,
            FK_IdPreCondicion: result.FK_IdPreCondicion,
            FK_IdPostCondicion: result.FK_IdPostCondicion,
            TipoEstadoNombre: result.TipoEstadoNombre
      
  }

  res.json(TraEstadoDefinicionDTO);
}

module.exports.GetNextEstadosByIdEstadoActual = function (req, res) {
  
    return TraEstadoDefinicionModel.GetNextEstadosByIdEstadoActual(req.params.idEstadoActual).then(function (result, $filter) {

        var rtn = [];
        if (result.recordset) {
            result.recordset.forEach(element => {

                if (element) {

                    // Se arma el DTO
                    var resultDTO = {
                        IdTramite: element.FK_IdTramite,
                        IdEstadoSiguiente: element.FK_IdEstadoSiguiente,
                        GrupoAsignado: {
                            IdGrupo: element.IdGrupo,
                            NombreGrupo: element.NombreGrupo
                        },
                        Pantalla: {
                            IdPantalla: element.IdPantalla,
                            NombrePantalla: element.NombrePantalla
                        },
                        Condicion: element.Condicion
                    }
                    rtn.push(resultDTO);
                }
            });

            res.json(rtn);
        } else {
            res.json([]);
        }
    });
};

module.exports.GetEstadoInicialByIdTramite = function (req, res) {

    return TraEstadoDefinicionModel.GetEstadoInicialByIdTramite(req.params.idTramite).then(function (result, $filter) {

        var rtn = [];
        if (result.recordset) {
            result.recordset.forEach(element => {

                if (element) {

                    // Usuarios del grupo                    
                    TraGrupoUsuariosModel.GetUsuariosByIdGrupo(element.FK_IdAsignadoGrupo).then(function (resultGrupoUsuario, $filter) {

                        var GrupoUsuarioList = [];
                        if (resultGrupoUsuario.recordset) {
                            resultGrupoUsuario.recordset.forEach(element => {
                                if (element) {
                                    GrupoUsuarioList.push(element);
                                }
                            });
                        }
                        // Se arma el DTO
                        var resultDTO = {
                            IdTramite: element.FK_IdTramite,
                            Nombre: element.Nombre,

                            IdEstado: element.IdEstado,
                            TipoEstado: element.TipoEstado,
                            NombreTipoEstado: element.NombreTipoEstado,

                            GrupoAsignado: {
                                IdAsignadoGrupo: element.FK_IdAsignadoGrupo,
                                NombreGrupoAsignado: element.NombreGrupo,
                                UsuarioList: GrupoUsuarioList
                            },
                            Pantalla: {
                                IdPantalla: element.IdPantalla,
                                NombrePantalla: element.NombrePantalla
                            },

                            Tiempo1Escalabilidad: element.Tiempo1Escalabilidad,
                            Tiempo2Escalabilidad: element.Tiempo2Escalabilidad,
                            Tiempo3Escalabilidad: element.Tiempo3Escalabilidad,

                            Grupo1Escalado: element.FK_Grupo1Escalado,
                            Grupo2Escalado: element.FK_Grupo2Escalado,
                            Grupo3Escalado: element.FK_Grupo3Escalado,

                            IdPreCondicion: element.FK_IdPreCondicion,
                            IdPostCondicion: element.FK_IdPostCondicion,

                            DuracionLimiteTarea: element.DuracionLimiteTarea
                        }
                        rtn.push(resultDTO);
                        if(result.recordset[result.recordset.length - 1] == element)
                            res.json(rtn);
                        
                    });


                }
            });
            
        }



    });
}