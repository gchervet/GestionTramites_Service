var UniAlumnoModel = require('../../model/business/UniAlumnoModel.js');
var TraAlumnoLibretaUni = require('../../model/business/TraAlumnoLibretaUniModel.js');

module.exports.GetAlumnoByLegajo = function(req, res){
    
    UniAlumnoModel.getByLegajo(req.params.id)
    .then(result => {
        res.json(result.recordset);
    });
}

module.exports.GetAlumnoByUsername = function(req, res){
    
    UniAlumnoModel.GetAlumnoByUsername(req.params.username)
    .then(result => {
        var rtn = null;
        if(result.recordset.length){

            var returnDTO = {
                IdUsuario: result.recordset[0].IdUsuario,
                IdEntidad: result.recordset[0].IdEntidad,
                LegajoProvisorio: result.recordset[0].legprovi,
                LegajoDefinitivo: result.recordset[0].legdef,
                Apellido: result.recordset[0].apellido,
                Nombre: result.recordset[0].nombre,
                FechaNacimiento: result.recordset[0].fecnac,
                LugarNacimiento: result.recordset[0].lugar,
                Documento: result.recordset[0].docnac,
                Sexo: result.recordset[0].sexo,
                Modalidad: result.recordset[0].Modalidad,
                Carrera: result.recordset[0].carrera,
                CarreraNombre: result.recordset[0].NombreEscuela,
                Regional: result.recordset[0].regional,
                RegionalNombre: result.recordset[0].NombreRegional,
                Turno: result.recordset[0].turno,
                NombreGrado: result.recordset[0].NombreGrado,
                CarreraFinalizada: result.recordset[0].CarreraFinalizada

            }
            rtn = returnDTO;
        }
        res.json(rtn);
    });
}

module.exports.GetDatosPersonalesByLegajoMock = function (req, res) {

    var result = UniAlumnoModel.getDatosPersonalesByLegajoMock(req.params.id);
    if (result.recordset) {
        var rtn = null;
        if (result.recordset.length) {
            var alumnoDTO = {
                Legajo: result.Legajo,
                Carrera: result.Carrera,
                Nombre: result.Nombre,
                Modalidad: result.Modalidad,
                TipoDocumento: result.TipoDocumento,
                Documento: result.Documento,
                LugarNacimiento: result.LugarNacimiento,
                FechaNacimiento: result.FechaNacimiento,
                Domicilio: result.Domicilio,
                Localidad: result.Localidad,
                CodigoPostal: result.CodigoPostal,
                Telefono: result.Telefono,
                Telefono2: result.Telefono2,
                Mail: result.Mail,
                Mail2: result.Mail2,
                MesAnoFinalCarreraUK: result.MesAnoFinalCarreraUK,
                AnoFinalSecundario: result.AnoFinalSecundario,
                NombreOpcional: result.NombreOpcional,
                TelefonoOpcional: result.TelefonoOpcional,
                MailOpcional: result.MailOpcional
            }
            rtn = alumnoDTO;
        }
        res.json(rtn);
    }
}

module.exports.GetDatosPersonalesByLegajo = function (req, res) {

    var result = UniAlumnoModel.getDatosPersonalesByLegajo(req.params.id);

    var alumnoDTO = {
        Legajo: result.Legajo,
        Carrera: result.Carrera,
        Nombre: result.Nombre,
        Modalidad: result.Modalidad,
        TipoDocumento: result.TipoDocumento,
        Documento: result.Documento,
        LugarNacimiento: result.LugarNacimiento,
        FechaNacimiento: result.FechaNacimiento,
        Domicilio: result.Domicilio,
        Localidad: result.Localidad,
        CodigoPostal: result.CodigoPostal,
        Telefono: result.Telefono,
        Telefono2: result.Telefono2,
        Mail: result.Mail,
        Mail2: result.Mail2,
        MesAnoFinalCarreraUK: result.MesAnoFinalCarreraUK,
        AnoFinalSecundario: result.AnoFinalSecundario,
        NombreOpcional: result.NombreOpcional,
        TelefonoOpcional: result.TelefonoOpcional,
        MailOpcional: result.MailOpcional
    }

    res.json(alumnoDTO);
}

module.exports.ValidateLegajo = function (req, res) {
    
    return UniAlumnoModel.ValidateLegajo(req.params.legajo).then(function(result, $filter){
        
        var rtn = null;
        if(result.recordset.length){

            var returnDTO = {
                IdEntidad: result.recordset[0].IdEntidad,
                LegajoProvisorio: result.recordset[0].legprovi,
                LegajoDefinitivo: result.recordset[0].legdef,
                Apellido: result.recordset[0].apellido,
                Nombre: result.recordset[0].nombre,
                FechaNacimiento: result.recordset[0].fecnac,
                LugarNacimiento: result.recordset[0].lugar,
                Documento: result.recordset[0].docnac,
                Sexo: result.recordset[0].sexo,
                Modalidad: result.recordset[0].Modalidad,
                Carrera: result.recordset[0].carrera,
                CarreraNombre: result.recordset[0].NombreEscuela,
                Regional: result.recordset[0].regional,
                RegionalNombre: result.recordset[0].NombreRegional,
                Turno: result.recordset[0].turno,
                NombreGrado: result.recordset[0].NombreGrado,
                IdUsuario: result.recordset[0].IdUsuario,
                Username: result.recordset[0].username
            }
            rtn = returnDTO;
        }
        res.json(rtn);
    });
}

module.exports.GetDatosPersonalesByLegajoProgramasLegalizados = function (req, res) {

    return UniAlumnoModel.getDatosPersonalesByLegajoProgramasLegalizados(req.params.id).then(function(result, $filter){
        if (result.recordset.length) {
            var FechaNacimientoString = undefined;
            if (result.recordset[0].FechaNacimiento) {
                var array = result.recordset[0].FechaNacimiento.toLocaleDateString().split('-');
                FechaNacimientoString = array[2] + '/' + array[1] + '/' + array[0];
            }

            var alumnoDTO = {
                Legajo: result.recordset[0].Legajo,
                Carrera: result.recordset[0].Carrera,
                Nombre: result.recordset[0].Nombre,
                Apellido: result.recordset[0].Apellido,
                Modalidad: result.recordset[0].Modalidad,
                TipoDocumento: result.recordset[0].TipoDocumento,
                Documento: result.recordset[0].Documento,
                LugarNacimiento: result.recordset[0].LugarNacimiento,
                FechaNacimiento: FechaNacimientoString,
                DirCalle: result.recordset[0].DirCalle,
                DirNumero: result.recordset[0].DirNumero,
                DirPiso: result.recordset[0].DirPiso,
                DirDepto: result.recordset[0].DirDepto,
                Localidad: result.recordset[0].Localidad,
                CodigoPostal: result.recordset[0].CodigoPostal,
                TelFijoCodPais: result.recordset[0].TelFijoCodPais,
                TelFijoCodArea: result.recordset[0].TelFijoCodArea,
                TelFijoNumero: result.recordset[0].TelFijoNumero,
                TelMovilCodPais: result.recordset[0].TelMovilCodPais,
                TelMovilCodArea: result.recordset[0].TelMovilCodArea,
                TelMovilNumero: result.recordset[0].TelMovilNumero,
                Mail: result.recordset[0].Mail,
                TituloSecundario: result.recordset[0].TituloSecundario,
                AnoFinalSecundario: result.recordset[0].AnoFinalSecundario,
                NombreSecundario: result.recordset[0].NombreSecundario,
                LocalidadSecundario: result.recordset[0].LocalidadSecundario
            }

            res.json(alumnoDTO);
        }
        else {
            res.json(false);
        }
    })
    .catch(function(result, $filter){
        res.json(false);
    });
}

module.exports.UpdateDatosPersonalesByLegajoProgramasLegalizados = function(req, res){

    return UniAlumnoModel.updateDatosPersonalesByLegajoProgramasLegalizados(req.body)
    .then(function(result, $filter){
        res.json(true);
    })
    .catch(function(err){
        res.json(false);
    });
}

module.exports.GetDatosPersonalesByLegajoAnalitico = function (req, res) {

    return UniAlumnoModel.getDatosPersonalesByLegajoAnalitico(req.params.id).then(function (result, $filter) {
        if (result.recordset.length) {
            var FechaNacimientoString = undefined;
            if (result.recordset[0].FechaNacimiento) {
                var array = result.recordset[0].FechaNacimiento.toLocaleDateString().split('-');
                FechaNacimientoString = array[2] + '/' + array[1] + '/' + array[0];
            }

            var alumnoDTO = {
                Legajo: result.recordset[0].Legajo,
                Carrera: result.recordset[0].Carrera,
                Nombre: result.recordset[0].Nombre,
                Apellido: result.recordset[0].Apellido,
                Modalidad: result.recordset[0].Modalidad,
                TipoDocumento: result.recordset[0].TipoDocumento,
                Documento: result.recordset[0].Documento,
                LugarNacimiento: result.recordset[0].LugarNacimiento,
                FechaNacimiento: FechaNacimientoString,
                DirCalle: result.recordset[0].DirCalle,
                DirNumero: result.recordset[0].DirNumero,
                DirPiso: result.recordset[0].DirPiso,
                DirDepto: result.recordset[0].DirDepto,
                Localidad: result.recordset[0].Localidad,
                CodigoPostal: result.recordset[0].CodigoPostal,
                TelFijoCodPais: result.recordset[0].TelFijoCodPais,
                TelFijoCodArea: result.recordset[0].TelFijoCodArea,
                TelFijoNumero: result.recordset[0].TelFijoNumero,
                TelMovilCodPais: result.recordset[0].TelMovilCodPais,
                TelMovilCodArea: result.recordset[0].TelMovilCodArea,
                TelMovilNumero: result.recordset[0].TelMovilNumero,
                Mail: result.recordset[0].Mail,
                Mail2: result.recordset[0].Mail2,
                TituloSecundario: result.recordset[0].TituloSecundario,
                AnoFinalSecundario: result.recordset[0].AnoFinalSecundario,
                NombreSecundario: result.recordset[0].NombreSecundario,
                LocalidadSecundario: result.recordset[0].LocalidadSecundario,
                ApellidoNombreOp: result.recordset[0].ApellidoNombreOp,
                TelefonoOp: result.recordset[0].TelefonoOp,
                MailOp: result.recordset[0].MailOp
            }

            res.json(alumnoDTO);
        }
        else {
            res.json(false);
        }
    })
    .catch(function(result, $filter){
        res.json(false);
    });
}

module.exports.UpdateDatosPersonalesByLegajoAnalitico = function(req, res){

    return UniAlumnoModel.updateDatosPersonalesByLegajoAnalitico(req.body)
    .then(function(result, $filter){
        res.json(true);
    })
    .catch(function(err){
        res.json(false);
    });
}

module.exports.GetDatosPersonalesByLibretaUniversitaria = function (req, res) {

    return UniAlumnoModel.getDatosPersonalesByLibretaUniversitaria(req.params.numeroDocumento, req.params.tipoDocumento).then(function(result, $filter){
        var alumnoDTO = {
            Carreras : []
        };
        result.recordset.forEach(element => {
                
            if(element){
                var carrera = {
                    LegDef : element.legdef,
                    LegProvi : element.legprovi,
                    Carrera : element.Carrera,
                    CarreraCod : element.codcar,
                    FotocopiaDniEstado : element.FotocopiaDniEstado,
                    FotosCarnetEstado : element.FotosCarnetEstado,
                    RetiroCodins : element.RetiroCodins,
                    TituloSecundarioEstado : element.TituloSecundarioEstado
                }
                alumnoDTO.Carreras.push(carrera);
            }
        });

        if (result.recordset.length > 0) {
            alumnoDTO.Nombre = result.recordset[0].nombre;
            alumnoDTO.Apellido = result.recordset[0].apellido;
            res.json(alumnoDTO);
        }
        else {
            res.json(false);
        }
        
        
    })
    .catch(function(result, $filter){
        res.json(false);
    });
}

module.exports.SaveDatosPersonalesByLibretaUniversitaria = function (req, res) {
    return TraAlumnoLibretaUni.getAlumnoLibretaUniByLegajoProvi(req.body.LegProvi).then(function (result, $filter) {
        if (result.recordset.length > 0) {
            return UniAlumnoModel.updateDatosPersonalesByLibretaUniversitaria(req.body)
                .then(function (result, $filter) {
                    res.json(true);
                })
                .catch(function (err) {
                    res.json(false);
                });
        } else {
            return UniAlumnoModel.createDatosPersonalesByLibretaUniversitaria(req.body)
                .then(function (result, $filter) {
                    res.json(true);
                })
                .catch(function (err) {
                    res.json(false);
                });
        }
    }).catch(function (err) {
        res.json(false);
    });
}

module.exports.UpdateDatosPersonalesByLibretaUniversitaria = function(req, res){

    return UniAlumnoModel.updateDatosPersonalesByLibretaUniversitaria(req.body)
    .then(function(result, $filter){
        res.json(true);
    })
    .catch(function(err){
        res.json(false);
    });
}

module.exports.CreateDatosPersonalesByLibretaUniversitaria = function(req, res){

    return UniAlumnoModel.createDatosPersonalesByLibretaUniversitaria(req.body)
    .then(function(result, $filter){
        res.json(true);
    })
    .catch(function(err){
        res.json(false);
    });
}

module.exports.GetAlumnoEstadoAcademico = function(req, res){

    return UniAlumnoModel.GetAlumnoEstadoAcademico(req.params.legprovi)
    .then(function(result, $filter){
        
        var rtn = null;
        if(result.recordset.length > 0){
            rtn = 
            {
                Alumno: {},
                EstadoAcademico: []
            };
            result.recordset.forEach(element => {
                
                if(element){
                    if(element.anio && element.cuatri){
                        // Si ya existe el año en el array
                        if(rtn.EstadoAcademico[element.anio-1]){

                            // Si ya existe el cuatrimestre en el año
                            if(!rtn.EstadoAcademico[element.anio-1].Cuatrimestre[element.cuatri-1]){
                                // No existe el cuatrimestre, verificar si existe un array de cuatrimestres
                                if(rtn.EstadoAcademico[element.anio-1].Cuatrimestre){
                                    // Existe el array de cuatrimestres
                                    rtn.EstadoAcademico[element.anio-1].Cuatrimestre[element.cuatri-1] = [];
                                }
                                else{
                                    // No existe el array de cuatrimestres
                                    rtn.EstadoAcademico[element.anio-1].Cuatrimestre = [];
                                    rtn.EstadoAcademico[element.anio-1].Cuatrimestre[element.cuatri-1] = [];                                    
                                }
                            }
                        }
                        else{
                            // No existe el año en el array
                            rtn.EstadoAcademico[element.anio-1] = {};
                            rtn.EstadoAcademico[element.anio-1].Cuatrimestre = [];
                            rtn.EstadoAcademico[element.anio-1].Cuatrimestre[element.cuatri-1] = [];
                        }

                        rtn.EstadoAcademico[element.anio-1].Cuatrimestre[element.cuatri-1].push({
                            CodMat: element.codmat,
                            Periodo: element.periodo,
                            Nombre: element.nombre,
                            CodDep: element.coddep,
                            Ano: element.anio,
                            Cuatrimestre: element.cuatri,
                            CodPlan: element.codigo,
                            CodMat: element.optativa,
                            CodMat: element.cursada,
                            CodMat: '20/12/1999',
                            Codigo: '103231'
                        });
                    }
                }
            });
            res.json(rtn);
        }

    })
    .catch(function(err){
        res.json(false);
    });
}