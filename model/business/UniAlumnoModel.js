var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular alumno
exports.getByLegajo = function(legajo) {
  console.log('UniAlumno/getByLegajo');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select * from uniAlumnos where legprovi = ' + legajo)
   });
}

exports.GetAlumnoByUsername = function(username) {
  console.log('UniAlumno/GetAlumnoByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(" DECLARE @TopLimit int " +
                                 "DECLARE @legajoProvisorio INT " +                                  
                                 "SET @TopLimit = 1" +
                                 "SET @legajoProvisorio = (SELECT legajo LegajoProvisorio FROM vUniAlumnosUsername WHERE username = '" + username + "') " +
                                 "SET ROWCOUNT @TopLimit " +                                              
                                 "SELECT tUA.IdUsuario, uA.[legprovi],uA.[legdef],uA.[apellido],uA.[nombre],uA.[fecnac], " +
                                 "uA.[lugar],uA.[docnac],uA.[cedide],uA.[libciv],uA.[libenr],uA.[sexo],uA.[argext],uA.[nacion], " +
                                 "uA.[nropas],uA.[tramite],uA.[carrera],uA.[regional],uA.[turno],uA.[finscrip], " +
                                 "uA.[email],uA.[username],uA.[regional_cursa],uE.[Nombre] AS NombreEscuela, " +
                                 "uR.[Nombre] AS NombreRegional,[dbo].[fn_es_carrera_tipo](1, uE.Nivel) AS Grado, " +
                                 "[dbo].[fn_es_carrera_tipo](2, uE.Nivel) AS PosGrado, " +
                                 "[dbo].[fn_es_carrera_tipo](3, uE.Nivel) AS PreGrado,uE.Nivel AS NombreGrado, " +
                                 "uP.nomcar AS NombreCarrera,uA.version2,uA.documentoExtranjero,uA.PaisDocumento, " +
                                 "uA.Origen,[dbo].[fn_es_legajo_baja](ua.[legprovi]) AS Baja, " +
                                 "[dbo].[fn_es_alumno_activo](ua.legprovi) AS Activo,ua.IdEntidad,ua.CicloIngreso, " +
                                 "ua.CuatriIngreso,ua.Modalidad,ua.IdCanal ,ua.CanalDescripcion ,ua.Usuario , " +
                                 "ua.FechaModificacion, " +
                                 "CASE WHEN (dbo.fn_CantMateriasAprobadas(ua.legprovi, ua.legdef, ua.carrera) >= dbo.fn_cant_materias_plan(ua.carrera)) THEN 1 ELSE 0 END AS CarreraFinalizada " +
                                 "FROM uniAlumnos AS ua " +
                                 "INNER JOIN dbo.uniRegionales uR on uR.codigo = uA.regional " +
                                 "INNER JOIN uniPlanes up on up.codcar = uA.carrera  " +
                                 "INNER JOIN uniEscuelas ue on  ue.Codigo = up.codesc  " +
                                 "INNER JOIN traUsuarioAsignado tUA on tUA.Username = '" + username + "'" +
                                 "WHERE uA.legdef = @legajoProvisorio OR uA.legprovi = @legajoProvisorio")
  });
}

// Get a alumno function
exports.getDatosPersonalesByLegajo = function (legajo) {
  console.log('UniAlumno/getDatosPersonalesByLegajo');
 return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select a.legdef as Legajo,' +
     ' a.carrera as CarreraCod,' +
     ' e.Nombre as Carrera,' +
     " a.nombre + ' ' + a.apellido as Nombre," +
     ' a.Modalidad as ModalidadText,' +
     " case a.Modalidad when 'VIR' then 1 else 0 end as Modalidad," +
     ' adp.TipoDocumento,' +
     ' dp.NumeroDocumento as Documento,' +
     ' a.lugar as LugarNacimiento,' +
     ' a.fecnac as FechaNacimiento,' +
     " a.Domicilio as Domicilio," +
     " 'LOCALIDAD' as Localidad," +
     " adp.DirCodigoPostal as CodigoPostal," +
     ' adp.TelFijoCodPais + adp.TelFijoCodArea + adp.TelFijoNumero as Telefono,' +
     ' adp.TelMovilCodPais + adp.TelMovilCodArea + adp.TelMovilNumero as Telefono2,' +
     ' adp.EMail as Mail,' +
     " 'MAIL2' as Mail2," +
     " 'MesAnoFinalCarreraUK' as MesAnoFinalCarreraUK," +
     " 'AnoFinalSecundario' as AnoFinalSecundario," +
     " 'NombreOpcional' as NombreOpcional," +
     " 'TelefonoOpcional' as TelefonoOpcional," +
     " 'MailOpcional' as MailOpcional" +
     ' from uniAlumnos as a' +
     ' inner join uniAlumnosDatosPersonales as adp ON adp.IdEntidad = a.IdEntidad' +
     ' inner join uniPlanes as p ON p.codcar = a.Carrera' +
     ' inner join uniEscuelas as e ON e.Codigo = p.codesc' +
     ' where legprovi = ' + legajo + ' or legdef = ' + legajo)
   });}

// Get a alumno function
exports.ValidateLegajo = function (legajo) {
  console.log('UniAlumno/ValidateLegajo');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('SELECT TOP 1 ' +
                                  'ua.[legprovi] ' +
                                    ',[legdef] ' +
                                    ',[apellido] ' +
                                    ',ua.[nombre] ' +
                                    ',[fecnac] ' +
                                    ',[lugar] ' +
                                    ',[docnac] ' +
                                    ',[cedide] ' +
                                    ',[libciv] ' +
                                    ',[libenr] ' +
                                    ',[sexo] ' +
                                    ',[argext] ' +
                                    ',[nacion] ' +
                                    ',[nropas] ' +
                                    ',[tramite] ' +
                                    ',[carrera] ' +
                                    ',ua.[regional] ' +
                                    ',[turno] ' +
                                    ',[finscrip] ' +
                                    ',ua.[email] ' +
                                    ',tUA.[username] ' +
                                    ',[regional_cursa] ' +
                                    ',ue.[Nombre] as NombreEscuela ' +
                                    ',gReg.[Nombre] as NombreRegional ' +
                                    ',[dbo].[fn_es_carrera_tipo] (1,ue.Nivel) as Grado ' +
                                    ',[dbo].[fn_es_carrera_tipo] (2,ue.Nivel) as PosGrado ' +
                                    ',[dbo].[fn_es_carrera_tipo] (3,ue.Nivel) as PreGrado ' +
                                    ',ue.Nivel as NombreGrado ' +
                                    ',up.nomcar as NombreCarrera ' +
                                    ',version2 ' +
                                    ',documentoExtranjero ' +
                                    ',PaisDocumento ' +
                                ',Origen ' +
                                ',[dbo].[fn_es_legajo_baja](ua.[legprovi]) AS Baja ' +
                                    ',ua.IdEntidad ' +
                                    ',ua.CicloIngreso ' +
                                    ',ua.CuatriIngreso ' +
                                    ',ua.Modalidad ' +
                                    ',ua.IdCanal ' +
                                    ',ua.CanalDescripcion ' +
                                  ',ua.Usuario ' +
                                  ',ua.FechaModificacion ' +
                                  ',tUA.IdUsuario IdUsuario ' +
                                    'FROM uniAlumnos as ua      ' +
                                  'inner join dbo.grlRegionales gReg on gReg.regional = ua.regional ' +
                                'inner join uniPlanes up on up.codcar = ua.carrera  ' +
                                'inner join uniEscuelas ue on  ue.Codigo = up.codesc  ' +
                                'LEFT JOIN traUsuarioAsignado tUA ON tUA.Legprovi = UA.legprovi ' +
                                'WHERE		(ua.legdef=' + legajo + ' or ua.legprovi=' + legajo + ')')
   });
}

exports.getDatosPersonalesByLegajoProgramasLegalizados = function (legajo) {
  console.log('UniAlumno/getDatosPersonalesByLegajoProgramasLegalizados');
 return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select a.legdef as Legajo,' +
     ' a.carrera as CarreraCod,' +
     ' e.Nombre as Carrera,' +
     ' a.nombre as Nombre,' +
     ' a.apellido as Apellido,' +
     ' a.Modalidad as ModalidadText,' +
     " case a.Modalidad when 'VIR' then 1 else 0 end as Modalidad," +
     ' adp.TipoDocumento,' +
     ' adp.NumeroDocumento as Documento,' +
     ' a.lugar as LugarNacimiento,' +
     ' a.fecnac as FechaNacimiento,' +
     ' adp.DirCalle,' +
     ' adp.DirNumero,' +
     ' adp.DirPiso,' +
     ' adp.DirDepto,' +
     ' adp.Localidad,' +
     ' adp.DirCodigoPostal as CodigoPostal,' +
     ' adp.TelFijoCodPais,' +
     ' adp.TelFijoCodArea,' +
     ' adp.TelFijoNumero,' +
     ' adp.TelMovilCodPais,' +
     ' adp.TelMovilCodArea,' +
     ' adp.TelMovilNumero,' +
     ' adp.EMail as Mail,' +
     ' adp.TituloSecundario,' +
     ' adp.AnoEgresoSecundario as AnoFinalSecundario,' + 
     ' adp.NombreSecundario,' +
     ' adp.LocalidadSecundario' +
     ' from uniAlumnos as a' +
     ' inner join uniAlumnosDatosPersonales as adp ON adp.IdEntidad = a.IdEntidad' +
     ' inner join uniPlanes as p ON p.codcar = a.Carrera' +
     ' inner join uniEscuelas as e ON e.Codigo = p.codesc' +
     ' where legprovi = ' + legajo + ' or legdef = ' + legajo)
   });}

exports.updateDatosPersonalesByLegajoProgramasLegalizados = function (uniAlumno) {
  console.log('UniAlumno/updateDatosPersonalesByLegajoProgramasLegalizados');
  return new sql.ConnectionPool(config).connect().then(pool => {
    var strigify = function (string) {
      if (string)
        return "'" + string + "'";
      else
        return null;
    }
    var string = (" UPDATE ADP" +
    " SET DirCalle = " + strigify(uniAlumno.DirCalle) +
    " ,DirNumero = " + strigify(uniAlumno.DirNumero) +
    " ,DirPiso = " + strigify(uniAlumno.DirPiso) +
    " ,DirDepto = " + strigify(uniAlumno.DirDepto) +
    " ,DirCodigoPostal = " + strigify(uniAlumno.CodigoPostal) +
    " ,EMail = " + strigify(uniAlumno.Mail) +
    " ,TelFijoCodPais = " + strigify(uniAlumno.TelFijoCodPais) +
    " ,TelFijoCodArea = " + strigify(uniAlumno.TelFijoCodArea) +
    " ,TelFijoNumero = " + strigify(uniAlumno.TelFijoNumero) +
    " ,TelMovilCodPais = " + strigify(uniAlumno.TelMovilCodPais) +
    " ,TelMovilCodArea = " + strigify(uniAlumno.TelMovilCodArea) +
    " ,TelMovilNumero = " + strigify(uniAlumno.TelMovilNumero) +
    " ,TituloSecundario = " + strigify(uniAlumno.TituloSecundario) +
    " ,AnoEgresoSecundario = " +  strigify(uniAlumno.AnoFinalSecundario) +
    " ,NombreSecundario = " + strigify(uniAlumno.NombreSecundario) +
    " ,LocalidadSecundario = " + strigify(uniAlumno.LocalidadSecundario) +
    " ,Localidad = " + strigify(uniAlumno.Localidad) +

    // " OUTPUT INSERTED.DirCalle," +
    // " INSERTED.DirNumero," +
    // " INSERTED.DirPiso," +
    // " INSERTED.DirDepto," +
    // " INSERTED.DirCodigoPostal," +
    // " INSERTED.EMail," +
    // " INSERTED.TelFijoCodPais," +
    // " INSERTED.TelFijoCodArea," +
    // " INSERTED.TelFijoNumero," +
    // " INSERTED.TelMovilCodPais," +
    // " INSERTED.TelMovilCodArea," +
    // " INSERTED.TelMovilNumero," +
    // " INSERTED.TituloSecundario," +
    // " INSERTED.AnoEgresoSecundario," +
    // " INSERTED.NombreSecundario," +
    // " INSERTED.LocalidadSecundario," +
    // " INSERTED.Localidad" +

    " FROM uniAlumnosDatosPersonales as ADP" +
    " INNER JOIN uniAlumnos AS A" +
    " ON ADP.IdEntidad = A.IdEntidad" +' where legprovi = ' + uniAlumno.Legajo + ' or legdef = ' + uniAlumno.Legajo)
    return pool.request().query(string)

  });
}

exports.getDatosPersonalesByLegajoAnalitico = function (legajo) {
  console.log('UniAlumno/getDatosPersonalesByLegajoAnalitico');
  return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query('select a.legdef as Legajo,' +
      ' a.carrera as CarreraCod,' +
      ' e.Nombre as Carrera,' +
      ' a.nombre as Nombre,' +
      ' a.apellido as Apellido,' +
      ' a.Modalidad as ModalidadText,' +
      " case a.Modalidad when 'VIR' then 1 else 0 end as Modalidad," +
      ' adp.TipoDocumento,' +
      ' adp.NumeroDocumento as Documento,' +
      ' a.lugar as LugarNacimiento,' +
      ' a.fecnac as FechaNacimiento,' +
      ' adp.DirCalle,' +
      ' adp.DirNumero,' +
      ' adp.DirPiso,' +
      ' adp.DirDepto,' +
      ' adp.Localidad,' +
      ' adp.DirCodigoPostal as CodigoPostal,' +
      ' adp.TelFijoCodPais,' +
      ' adp.TelFijoCodArea,' +
      ' adp.TelFijoNumero,' +
      ' adp.TelMovilCodPais,' +
      ' adp.TelMovilCodArea,' +
      ' adp.TelMovilNumero,' +
      ' adp.EMail as Mail,' +
      ' adp.EMail2 as Mail2,' +
      ' adp.MesAnoFinalCarreraUK,' +
      ' adp.AnoEgresoSecundario as AnoFinalSecundario,' + 
      ' ac.ApellidoNombreOp,' +
      ' ac.TelefonoOp,' +
      ' ac.EmailOp as MailOp' +
      ' from uniAlumnos as a' +
      ' inner join uniAlumnosDatosPersonales as adp ON adp.IdEntidad = a.IdEntidad' +
      ' left join traAlumnoContactos as ac ON ac.IdEntidad = a.IdEntidad' +
      ' inner join uniPlanes as p ON p.codcar = a.Carrera' +
      ' inner join uniEscuelas as e ON e.Codigo = p.codesc' +
      ' where legprovi = ' + legajo + ' or legdef = ' + legajo)
    });
  }

  exports.updateDatosPersonalesByLegajoAnalitico = function (uniAlumno) {
    console.log('UniAlumno/updateDatosPersonalesByLegajoAnalitico');
    return new sql.ConnectionPool(config).connect().then(pool => {
      var strigify = function (string) {
        if (string)
          return "'" + string + "'";
        else
          return null;
      }
      var string = (" UPDATE ADP" +
      " SET DirCalle = " + strigify(uniAlumno.DirCalle) +
      " ,DirNumero = " + strigify(uniAlumno.DirNumero) +
      " ,DirPiso = " + strigify(uniAlumno.DirPiso) +
      " ,DirDepto = " + strigify(uniAlumno.DirDepto) +
      " ,DirCodigoPostal = " + strigify(uniAlumno.CodigoPostal) +
      " ,EMail = " + strigify(uniAlumno.Mail) +
      " ,EMail2 = " + strigify(uniAlumno.Mail2) +
      " ,TelFijoCodPais = " + strigify(uniAlumno.TelFijoCodPais) +
      " ,TelFijoCodArea = " + strigify(uniAlumno.TelFijoCodArea) +
      " ,TelFijoNumero = " + strigify(uniAlumno.TelFijoNumero) +
      " ,TelMovilCodPais = " + strigify(uniAlumno.TelMovilCodPais) +
      " ,TelMovilCodArea = " + strigify(uniAlumno.TelMovilCodArea) +
      " ,TelMovilNumero = " + strigify(uniAlumno.TelMovilNumero) +
      " ,MesAnoFinalCarreraUK = " + strigify(uniAlumno.MesAnoFinalCarreraUK) +
      " ,AnoEgresoSecundario = " + strigify(uniAlumno.AnoFinalSecundario) +
      " ,Localidad = " + strigify(uniAlumno.Localidad) +
      " FROM uniAlumnosDatosPersonales as ADP" +
      " INNER JOIN uniAlumnos AS A" +
      " ON ADP.IdEntidad = A.IdEntidad" +
      " where A.legprovi = " + uniAlumno.Legajo + " or A.legdef = " + uniAlumno.Legajo +
    " declare @id int" +
    " select @id = IdEntidad from uniAlumnos where legprovi = " + uniAlumno.legprovi +
    " IF EXISTS (select * from traAlumnoContactos where IdEntidad = @id)" +
    " UPDATE traAlumnoContactos" +
    " SET ApellidoNombreOp = " + strigify(uniAlumno.ApellidoNombreOp) +
    "   ,TelefonoOp = " + strigify(uniAlumno.TelefonoOp) +
    "   ,EmailOp = " + strigify(uniAlumno.EmailOp) +
    " WHERE IdEntidad = @id;" +
    " else" +
    " INSERT INTO traAlumnoContactos" +
    " VALUES (@id" +
    " ,'ApellidoNombreOp'" + strigify(uniAlumno.ApellidoNombreOp) +
    " ,'TelefonoOp'" + strigify(uniAlumno.TelefonoOp) +
    " ,'EmailOp'" + strigify(uniAlumno.MailOp) +
    " ); ")
      return pool.request().query(string)
  
    });
  }

  exports.getDatosPersonalesByLibretaUniversitaria = function (numeroDocumento, tipoDocumento) {
    console.log('UniAlumno/getDatosPersonalesByLibretaUniversitaria');
    return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query('declare @numeroDocumento as int = '+ numeroDocumento +','+
                                    ' @tipoDocumento as int = ' + tipoDocumento +
                                    ' if(@tipoDocumento = 0)'+
                                    ' select a.legprovi,'+
                                    ' a.legdef,'+
                                    ' a.apellido,'+
                                    ' a.nombre,'+
                                    ' e.Nombre as Carrera,'+
                                    ' a.Carrera as codcar,'+
                                    ' alu.FotocopiaDniEstado,'+
                                    ' alu.FotosCarnetEstado,'+
                                    ' alu.RetiroCodins,'+
                                    ' alu.TituloSecundarioEstado'+
                                    '   from uniAlumnos as a'+
                                    ' inner join uniPlanes as p ON p.codcar = a.Carrera'+
                                    ' inner join uniEscuelas as e ON e.Codigo = p.codesc'+
                                    ' left join traAlumnoLibretaUni as alu ON alu.Legprovi = a.legprovi'+
                                    ' where a.legprovi = @numeroDocumento or a.legdef = @numeroDocumento'+
                                    ' else if(@tipoDocumento = 1 or @tipoDocumento = 5)'+
                                    ' select a.legprovi,'+
                                    ' a.legdef,'+
                                    ' a.apellido,'+
                                    ' a.nombre,'+
                                    ' e.Nombre as Carrera,'+
                                    ' a.Carrera as codcar,'+
                                    ' alu.FotocopiaDniEstado,'+
                                    ' alu.FotosCarnetEstado,'+
                                    ' alu.RetiroCodins,'+
                                    ' alu.TituloSecundarioEstado'+
                                    '   from uniAlumnos as a'+
                                    ' inner join uniAlumnosDatosPersonales as ado	on ado.IdEntidad = a.IdEntidad'+
                                    ' inner join uniPlanes as p ON p.codcar = a.Carrera'+
                                    ' inner join uniEscuelas as e ON e.Codigo = p.codesc'+
                                    ' left join traAlumnoLibretaUni as alu ON alu.Legprovi = a.legprovi'+
                                    ' where ado.TipoDocumento = @tipoDocumento and ado.NumeroDocumento = @numeroDocumento')
      });
    }

    exports.updateDatosPersonalesByLibretaUniversitaria = function (uniAlumno) {
      console.log('UniAlumno/updateDatosPersonalesByLibretaUniversitaria');
      return new sql.ConnectionPool(config).connect().then(pool => {
        var strigify = function (string) {
          if (string)
            return "'" + string + "'";
          else
            return null;
        }
        var string = ("UPDATE traAlumnoLibretaUni" +
        " SET FotocopiaDniEstado = "+ strigify(uniAlumno.FotocopiaDniEstado) +
        " ,FotosCarnetEstado = "+strigify(uniAlumno.FotosCarnetEstado) +
        " ,TituloSecundarioEstado = "+strigify(uniAlumno.TituloSecundarioEstado) +
        " ,RetiroCodins = "+strigify(uniAlumno.RetiroCodins) +
        " WHERE Legprovi = " + uniAlumno.LegProvi)
        return pool.request().query(string)
    
      });
    }

    exports.createDatosPersonalesByLibretaUniversitaria = function (uniAlumno) {
      console.log('UniAlumno/createDatosPersonalesByLibretaUniversitaria');
      return new sql.ConnectionPool(config).connect().then(pool => {
        var strigify = function (string) {
          if (string)
            return "'" + string + "'";
          else
            return null;
        }
        var string = ("INSERT INTO traAlumnoLibretaUni" +
        " VALUES (" + uniAlumno.LegProvi +
        " ," + strigify(uniAlumno.FotocopiaDniEstado) +
        " ," + strigify(uniAlumno.FotosCarnetEstado) +
        " ," + strigify(uniAlumno.TituloSecundarioEstado) +
        " ,"  + strigify(uniAlumno.RetiroCodins) + ")")
        return pool.request().query(string)
    
      });
    }

    exports.GetAlumnoEstadoAcademico = function (legprov) {
      console.log('UniAlumno/GetAlumnoEstadoAcademico');
      return new sql.ConnectionPool(config).connect().then(pool => {
        return pool.request().query('exec sp_get_MateriasDetalladasEstado ' + legprov + ', 2018, 2');
      });
    }
    
    