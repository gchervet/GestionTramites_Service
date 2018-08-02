var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetEstadoInstanciaVencidasAll = function (username) {
  console.log('TraEstadoInstancia/GetEstadoInstanciaVencidasAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(
      "SELECT tri.FK_IdTramite IdTramite, " +
      "tri.IdInstanciaTramite AS NroTramite,  " +
      "tri.IdInstanciaTramiteActivo AS NroTramiteActivo,  " +
      "tr.Nombre AS NombreTramite,  " +
      "ed.Nombre AS NombreTarea, " +
      "ed.duracionlimitetarea, " +
      "tr.Descripcion AS DescripcionTramite, " +
      "trap.Descripcion AS Prioridad,	 " +
      "tEE.IdEstadoEstado, " +
      "tEE.Nombre Estado, " +
      "ei.FechaEntradaBandeja AS FechaEntradaBandeja,  " +
      "tR.Prioridad PrioridadTramite, " +
      "tri.Prioridad PrioridadInstanciaTramite, " +
      "tri.IdentificadorInteresado IdentificadorInteresado, " +
      "ed.Prioridad PrioridadEstado, " +
      "ei.Prioridad PrioridadInstanciaEstado, " +
      //"DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja) AS FechaLimite,  " +
      "DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja) AS FechaLimite, " +
      "DATEDIFF(day,DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja),getdate()) AS DiasVencidos, " +
      "g.IdGrupo, " +
      "g.NombreGrupo AS GrupoAsignado, " +
      "dbo.fn_traGrupoUsuario_isJefe_by_Username('" + username + "',g.idgrupo) AS esJefe, " +
      "ei.FK_IdAsignadoUsuario AS IdUsuarioAsignado, " +
      "tUA.Username UsuarioAsignadoUsername, tUA.Email UsuarioAsignadoEmail, " +
      "tTE.IdTipoEstado, tTE.Nombre TipoEstadoNombre, " +
      "ei.IdEstadoInstancia AS NroTarea, " +
      "tITO.texto as Observaciones, " +
      "ed.Tiempo1Escalabilidad, " +
      "ed.Tiempo2Escalabilidad, " +
      "ed.Tiempo3Escalabilidad, " + 
      "ua1.Email as EmailEscalado1, " +
      "ua2.Email as EmailEscalado2, " +
      "ua3.Email as EmailEscalado3 " +
      "FROM traTramite tr " +
      "INNER JOIN traInstanciaTramite tri ON tr.IdTramite = tri.FK_IdTramite " +
      "INNER JOIN traEstadoDefinicion ed ON tr.IdTramite = ed.FK_IdTramite " +
      "INNER JOIN traEstadoInstancia ei ON ed.IdEstado = ei.IdEstadoDefinicion and ei.IdInstanciaTramite = tri.IdInstanciaTramite " +
      "INNER JOIN traGrupoAsignado g ON ed.FK_IdAsignadoGrupo = g.IdGrupo " +
      "LEFT JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = ei.FK_IdAsignadoUsuario " +
      "INNER JOIN traTipoPrioridad trap ON tri.Prioridad = trap.IdTipoPrioridad " +
      "INNER JOIN traEstadoEstado tEE ON ei.EstadoEstado = tEE.IdEstadoEstado " +
      "INNER JOIN traTipoEstado tTE ON tTE.IdTipoEstado = ED.TipoEstado " +
      "LEFT JOIN traEstadoInstanciaObservaciones tITO ON tITO.FK_IdEstadoInstancia = ei.IdEstadoInstancia " +
      "LEFT JOIN traUsuarioAsignado ua1 on ua1.IdUsuario = ed.FK_Grupo1Escalado " +
	    "LEFT JOIN traUsuarioAsignado ua2 on ua2.IdUsuario = ed.FK_Grupo2Escalado " +
	    "LEFT JOIN traUsuarioAsignado ua3 on ua3.IdUsuario = ed.FK_Grupo3Escalado " +
      "WHERE ei.EstadoEstado IN (0,1,3,4,5) "
    )
  });
}

exports.GetEstadoInstanciaListAll = function (username) {
  console.log('TraEstadoInstancia/GetEstadoInstanciaListAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(
      "SELECT tri.FK_IdTramite IdTramite, " +
      "tri.IdInstanciaTramite AS NroTramite,  " +
      "tri.IdInstanciaTramiteActivo AS NroTramiteActivo,  " +
      "tr.Nombre AS NombreTramite,  " +
      "ed.Nombre AS NombreTarea, ed.DuracionLimiteTarea, " +
      "tr.Descripcion AS DescripcionTramite, " +
      "trap.Descripcion AS Prioridad,	 " +
      "tEE.IdEstadoEstado, " +
      "tEE.Nombre Estado, " +
      "ei.FechaEntradaBandeja AS FechaEntradaBandeja,  " +
      "tR.Prioridad PrioridadTramite, " +
      "tri.Prioridad PrioridadInstanciaTramite, " +
      "tri.IdentificadorInteresado IdentificadorInteresado, " +
      "ed.Prioridad PrioridadEstado, " +
      "ei.Prioridad PrioridadInstanciaEstado, " +
      //"DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja) AS FechaLimite,  " +
      "DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja) AS FechaLimite, " +
      "g.IdGrupo, " +
      "g.NombreGrupo AS GrupoAsignado, " +
      "dbo.fn_traGrupoUsuario_isJefe_by_Username('" + username + "',g.idgrupo) AS esJefe, " +
      "ei.FK_IdAsignadoUsuario AS IdUsuarioAsignado, " +
      "tUA.Username UsuarioAsignadoUsername, tUA.Email UsuarioAsignadoEmail, " +
      "tTE.IdTipoEstado, tTE.Nombre TipoEstadoNombre, " +
      "ei.IdEstadoInstancia AS NroTarea, " +
      "tITO.texto as Observaciones " +
      "FROM traTramite tr " +
      "INNER JOIN traInstanciaTramite tri ON tr.IdTramite = tri.FK_IdTramite " +
      "INNER JOIN traEstadoDefinicion ed ON tr.IdTramite = ed.FK_IdTramite " +
      "INNER JOIN traEstadoInstancia ei ON ed.IdEstado = ei.IdEstadoDefinicion and ei.IdInstanciaTramite = tri.IdInstanciaTramite " +
      "INNER JOIN traGrupoAsignado g ON ed.FK_IdAsignadoGrupo = g.IdGrupo " +
      "LEFT JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = ei.FK_IdAsignadoUsuario " +
      "INNER JOIN traTipoPrioridad trap ON tri.Prioridad = trap.IdTipoPrioridad " +
      "INNER JOIN traEstadoEstado tEE ON ei.EstadoEstado = tEE.IdEstadoEstado " +
      "INNER JOIN traTipoEstado tTE ON tTE.IdTipoEstado = ED.TipoEstado " +
      "LEFT JOIN traEstadoInstanciaObservaciones tITO ON tITO.FK_IdEstadoInstancia = ei.IdEstadoInstancia "
    )
  });
}


exports.GetEstadoInstanciaListByUsername = function (username,iniciadas) {
  console.log('TraEstadoInstancia/GetEstadoInstanciaListByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    var queryString = 
    "SELECT tri.FK_IdTramite IdTramite, " +
    "tri.IdInstanciaTramite AS NroTramite,  " +
    "tri.IdInstanciaTramiteActivo AS NroTramiteActivo,  " +
    "tr.Nombre AS NombreTramite,  " +
    "ed.Nombre AS NombreTarea, ed.DuracionLimiteTarea, " +
    "tr.Descripcion AS DescripcionTramite, " +
    "trap.IdTipoPrioridad AS Prioridad,	 " +
    "tEE.IdEstadoEstado, " +
    "tEE.Nombre Estado, " +
    "ei.FechaEntradaBandeja AS FechaEntradaBandeja,  " +
    "tR.Prioridad PrioridadTramite, " +
    "tri.Prioridad PrioridadInstanciaTramite, " +
    "tri.IdentificadorInteresado IdentificadorInteresado, " +
    "ed.Prioridad PrioridadEstado, " +
    "ei.Prioridad PrioridadInstanciaEstado, " +
    //"DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja) AS FechaLimite,  " +
    "DATEADD(day,ed.DuracionLimiteTarea,ei.FechaEntradaBandeja) AS FechaLimite, " +
    "g.IdGrupo, " +
    "g.NombreGrupo AS GrupoAsignado, " +
    "dbo.fn_traGrupoUsuario_isJefe_by_Username('" + username + "',g.idgrupo) AS esJefe, " +
    "ei.FK_IdAsignadoUsuario AS IdUsuarioAsignado, " +
    "tUA.Username UsuarioAsignadoUsername, tUA.Email UsuarioAsignadoEmail, " +
    "tTE.IdTipoEstado, tTE.Nombre TipoEstadoNombre, " +
    "ei.IdEstadoInstancia AS NroTarea, " +
    "COUNT(tITO.texto) as Observaciones, " +
    "ei.ValoresEntrada, " +
    "ei.ValoresSalida " +
    "FROM traTramite tr " +
    "INNER JOIN traInstanciaTramite tri ON tr.IdTramite = tri.FK_IdTramite " +
    "INNER JOIN traEstadoDefinicion ed ON tr.IdTramite = ed.FK_IdTramite " +
    "INNER JOIN traEstadoInstancia ei ON ed.IdEstado = ei.IdEstadoDefinicion and ei.IdInstanciaTramite = tri.IdInstanciaTramite " +
    "INNER JOIN traGrupoAsignado g ON ed.FK_IdAsignadoGrupo = g.IdGrupo " +
    "LEFT JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = ei.FK_IdAsignadoUsuario " +
    "INNER JOIN traTipoPrioridad trap ON ed.FK_EstadoPrioridad = trap.IdTipoPrioridad " +
    "INNER JOIN traEstadoEstado tEE ON ei.EstadoEstado = tEE.IdEstadoEstado " +
    "INNER JOIN traTipoEstado tTE ON tTE.IdTipoEstado = ED.TipoEstado " +
    "LEFT JOIN traEstadoInstanciaObservaciones tITO ON tITO.FK_IdEstadoInstancia = ei.IdEstadoInstancia " +
    "WHERE ";
    if(iniciadas==1){
          queryString += "dbo.fn_ha_inicio_tramite('"+username+"',tri.IdInstanciaTramiteActivo)=1 AND " +
          " IdGrupo IN ( " +
          "SELECT tGU.IdGrupo FROM TraGrupoUsuarios tGU " +
          "INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario " +
          "WHERE tUA.Username =  '" + username + "') " +
          " AND ei.IdEstadoInstancia NOT IN " +
          " ((SELECT DISTINCT traEI1.idestadoinstancia  FROM traEstadoInstancia traEI1 " +
          "  INNER JOIN traEstadoDefinicion traED1 on traED1.IdEstado = traEI1.IdEstadoDefinicion " +
          "  INNER JOIN TraGrupoUsuarios tGU ON tGU.IdGrupo = traED1.FK_IdAsignadoGrupo "+
          "  INNER JOIN traUsuarioAsignado tUA ON tGU.IdUsuario = tUa.IdUsuario " +
          "  WHERE traEI1.EstadoEstado=1 AND " + 
          "  traEI1.FK_IdAsignadoUsuario NOT IN  (SELECT tUA.idusuario FROM trausuarioasignado tUA WHERE tUA.username = '" + username + "') AND " +
          " tGU.IdGrupo IN " +
          " (SELECT tGU.IdGrupo FROM TraGrupoUsuarios tGU INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario WHERE tGU.esJefe=0 AND tUA.Username =  '" + username + "')) " +
          " UNION " +
          " (SELECT DISTINCT traEI1.IdEstadoInstancia FROM traEstadoInstancia traEI1 " +
          " INNER JOIN traestadodefinicion ed ON traEI1.IdEstadoDefinicion = ed.IdEstado " +
          " INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = traEI1.FK_IdAsignadoUsuario " +
          " INNER JOIN TraGrupoUsuarios tGU ON tUA.IdUsuario = tGU.IdUsuario " +
          " WHERE traEI1.EstadoEstado IN (2,6) OR ed.FK_IdAsignadoGrupo NOT IN " +
          " (SELECT tGU.IdGrupo FROM TraGrupoUsuarios tGU INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario WHERE tUA.Username =  '" + username + "'))) " +
          "GROUP BY tri.FK_IdTramite , tri.IdInstanciaTramite ,  tri.IdInstanciaTramiteActivo ,  tr.Nombre ,  ed.Nombre , ed.DuracionLimiteTarea, tr.Descripcion , trap.IdTipoPrioridad ,	 tEE.IdEstadoEstado, tEE.Nombre , ei.FechaEntradaBandeja ,  tR.Prioridad , tri.Prioridad , tri.IdentificadorInteresado , ed.Prioridad , ei.Prioridad , g.IdGrupo, g.NombreGrupo , ei.FK_IdAsignadoUsuario , tUA.Username , tUA.Email , tTE.IdTipoEstado, tTE.Nombre , ei.IdEstadoInstancia, ei.ValoresEntrada, ei.ValoresSalida " +
          " order by tri.IdInstanciaTramite DESC ";
    }else{
          queryString += " IdGrupo IN ( " +
          "SELECT tGU.IdGrupo FROM TraGrupoUsuarios tGU " +
          "INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario " +
          "WHERE tUA.Username =  '" + username + "') " +
          " AND ei.IdEstadoInstancia NOT IN " +
          " ((SELECT DISTINCT traEI1.idestadoinstancia  FROM traEstadoInstancia traEI1 " +
          "  INNER JOIN traEstadoDefinicion traED1 on traED1.IdEstado = traEI1.IdEstadoDefinicion " +
          "  INNER JOIN TraGrupoUsuarios tGU ON tGU.IdGrupo = traED1.FK_IdAsignadoGrupo "+
          "  INNER JOIN traUsuarioAsignado tUA ON tGU.IdUsuario = tUa.IdUsuario " +
          "  WHERE traEI1.EstadoEstado=1 AND " + 
          "  traEI1.FK_IdAsignadoUsuario NOT IN  (SELECT tUA.idusuario FROM trausuarioasignado tUA WHERE tUA.username = '" + username + "') AND " +
          " tGU.IdGrupo IN " +
          " (SELECT tGU.IdGrupo FROM TraGrupoUsuarios tGU INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario WHERE tGU.esJefe=0 AND tUA.Username =  '" + username + "')) " +
          " UNION " +
          " (SELECT DISTINCT traEI1.IdEstadoInstancia FROM traEstadoInstancia traEI1 " +
          " INNER JOIN traestadodefinicion ed ON traEI1.IdEstadoDefinicion = ed.IdEstado " +
          " INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = traEI1.FK_IdAsignadoUsuario " +
          " INNER JOIN TraGrupoUsuarios tGU ON tUA.IdUsuario = tGU.IdUsuario " +
          " WHERE traEI1.EstadoEstado IN (2,6) OR ed.FK_IdAsignadoGrupo NOT IN " +
          " (SELECT tGU.IdGrupo FROM TraGrupoUsuarios tGU INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario WHERE tUA.Username =  '" + username + "'))) " +
          "GROUP BY tri.FK_IdTramite , tri.IdInstanciaTramite ,  tri.IdInstanciaTramiteActivo ,  tr.Nombre ,  ed.Nombre , ed.DuracionLimiteTarea, tr.Descripcion , trap.IdTipoPrioridad ,	 tEE.IdEstadoEstado, tEE.Nombre , ei.FechaEntradaBandeja ,  tR.Prioridad , tri.Prioridad , tri.IdentificadorInteresado , ed.Prioridad , ei.Prioridad , g.IdGrupo, g.NombreGrupo , ei.FK_IdAsignadoUsuario , tUA.Username , tUA.Email , tTE.IdTipoEstado, tTE.Nombre , ei.IdEstadoInstancia, ei.ValoresEntrada, ei.ValoresSalida " +
          " order by tri.IdInstanciaTramite DESC";
    }
    return pool.request().query(queryString)
  });
}

// Get a particular EstadoDefinicion
exports.GetByIdInstanciaTramite = function (idInstanciaTramite) {
  console.log('TraEstadoInstancia/GetByIdInstanciaTramite');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select ei.*, ee.Nombre as EstadoEstadoNombre' +
      ' from traEstadoInstancia as ei' +
      ' inner join traEstadoEstado as ee on ee.IdEstadoEstado = ei.EstadoEstado' +
      ' where ei.idInstanciaTramite = ' + idInstanciaTramite)
  });
}

exports.GetByIdEstadoInstancia = function (idEstadoInstancia) {
  console.log('TraEstadoInstancia/GetByIdEstadoInstancia');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("  SELECT ei.*, ee.Nombre AS EstadoEstadoNombre, ted.IdPantalla, tp.Nombre NombrePantalla, ei.Prioridad PrioridadEstadoInstancia, ted.Prioridad PrioridadEstado " +
      "FROM traEstadoInstancia AS ei " +
      "LEFT JOIN traEstadoEstado AS ee ON ee.IdEstadoEstado = ei.EstadoEstado " +
      "LEFT JOIN traEstadoDefinicion ted ON ted.IdEstado = ei.IdEstadoDefinicion " +
      "LEFT JOIN traPantalla tp ON tp.IdPantalla = ted.IdPantalla " +
      "WHERE ei.idEstadoInstancia = " + idEstadoInstancia)
  });
}

exports.Update = function (traEstadoInstancia) {
  console.log('traEstadoInstancia/Update');

  var sqlUpdateTramite = " UPDATE traEstadoInstancia SET ";

  if (traEstadoInstancia.EstadoEstado && traEstadoInstancia.EstadoEstado != 'null') {
    sqlUpdateTramite += " EstadoEstado=" + traEstadoInstancia.EstadoEstado + ", ";

    if (traEstadoInstancia.EstadoEstado == 1) {
      sqlUpdateTramite += " Comienzo=getdate(), ";
    }
    if (traEstadoInstancia.EstadoEstado == 2 || traEstadoInstancia.EstadoEstado == 6) {
      sqlUpdateTramite += " Fin=getdate(), "
    }
    if(traEstadoInstancia.EstadoEstado == 0){
      sqlUpdateTramite += " FechaEntradaBandeja=getdate(), ";
    }
  }
  if (traEstadoInstancia.ValoresEntrada && traEstadoInstancia.ValoresEntrada != 'null') {
    sqlUpdateTramite += " ValoresEntrada=" + "'" + traEstadoInstancia.ValoresEntrada + "', ";
  }
  if (traEstadoInstancia.IdAsignadoUsuario && traEstadoInstancia.IdAsignadoUsuario != 'null') {
    sqlUpdateTramite += " FK_IdAsignadoUsuario=" + traEstadoInstancia.IdAsignadoUsuario + ", ";
  }
  if (traEstadoInstancia.ValoresSalida && traEstadoInstancia.ValoresSalida != 'null') {
    sqlUpdateTramite += " ValoresSalida=" + "'" + traEstadoInstancia.ValoresSalida + "', ";
  }
  if (traEstadoInstancia.Prioridad && traEstadoInstancia.Prioridad != 'null') {
    sqlUpdateTramite += " Prioridad=" + "'" + traEstadoInstancia.Prioridad + "' ";
  }

  var ultimo_valor = sqlUpdateTramite.substring(sqlUpdateTramite.length-2, sqlUpdateTramite.length);
  if (ultimo_valor==', '){
      var sqlUpdateTramite = sqlUpdateTramite.slice(0,-2);
  }
 
  // FechaEntradaBandeja siempre se carga si 

  sqlUpdateTramite += " WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia  + " " +
    "  select ei.*, tp.IdPantalla, tp.Nombre as NombrePantalla from traEstadoInstancia as ei" +
    "  LEFT JOIN traEstadoDefinicion ted ON ted.IdEstado = ei.IdEstadoDefinicion " +
    "  LEFT JOIN traPantalla tp ON tp.IdPantalla = ted.IdPantalla " +
    "  WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia;

  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(
      sqlUpdateTramite
      /*
      (traEstadoInstancia.EstadoEstado != null ? "  UPDATE traEstadoInstancia SET EstadoEstado = " + traEstadoInstancia.EstadoEstado + " WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia : "") +
      (traEstadoInstancia.ValoresEntrada != null ? "  UPDATE traEstadoInstancia SET ValoresEntrada = '" + traEstadoInstancia.ValoresEntrada + "' WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia : "") +
      (traEstadoInstancia.IdAsignadoUsuario != null ? "  UPDATE traEstadoInstancia SET FK_IdAsignadoUsuario = '" + traEstadoInstancia.IdAsignadoUsuario + "' WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia : "") +
      (traEstadoInstancia.FechaEntradaBandeja != null ? "  UPDATE traEstadoInstancia SET FechaEntradaBandeja = '" + traEstadoInstancia.FechaEntradaBandeja + "' WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia : "") +
      (traEstadoInstancia.Comienzo != null ? "  UPDATE traEstadoInstancia SET Comienzo = '" + traEstadoInstancia.Comienzo + "' WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia : "") +
      (traEstadoInstancia.Fin != null ? ("  UPDATE traEstadoInstancia SET Fin = '" + traEstadoInstancia.Fin + "' WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia) : "") +
      (traEstadoInstancia.ValoresSalida != null ? "  UPDATE traEstadoInstancia SET ValoresSalida = '" + traEstadoInstancia.ValoresSalida + "' WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia +

        "  select ei.*, tp.IdPantalla, tp.Nombre as NombrePantalla from traEstadoInstancia as ei" +
        "  LEFT JOIN traEstadoDefinicion ted ON ted.IdEstado = ei.IdEstadoDefinicion " +
        "  LEFT JOIN traPantalla tp ON tp.IdPantalla = ted.IdPantalla " +
        "  WHERE IdEstadoInstancia = " + traEstadoInstancia.IdEstadoInstancia : "")
      */

    )
  });
}

exports.Create = function (traEstadoInstancia) {
  console.log('traEstadoInstancia/Create');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('INSERT INTO traEstadoInstancia ([IdInstanciaTramite], [IdEstadoDefinicion], [FK_IdAsignadoUsuario], [FechaEntradaBandeja], [Comienzo], [EstadoEstado], [ValoresEntrada], [ValoresSalida], [Prioridad]) OUTPUT INSERTED.* VALUES (' +
      traEstadoInstancia.IdInstanciaTramite +
      ',' + traEstadoInstancia.IdEstadoDefinicion +
      ',' + traEstadoInstancia.IdAsignadoUsuario +
      (traEstadoInstancia.FechaEntradaBandeja != null ? ",'" + traEstadoInstancia.FechaEntradaBandeja + "'" : ",NULL") +
      (traEstadoInstancia.Comienzo != null ? ",'" + traEstadoInstancia.Comienzo + "'" : ",NULL") +
      "," + traEstadoInstancia.EstadoEstado +
      ",'" + (traEstadoInstancia.ValoresEntrada != null ? traEstadoInstancia.ValoresEntrada : '') +
      "','" + (traEstadoInstancia.ValoresSalida != null ? traEstadoInstancia.ValoresSalida : '') +
      "','" + traEstadoInstancia.Prioridad + "')")
  });
}

exports.GetEstadoInstanciaByGrupoAsignadoAndIdUsuario = function (idGrupo, idUsuario) {
  console.log('traEstadoInstancia/GetEstadoInstanciaByGrupoAsignadoAndIdUsuario');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('SELECT * FROM traEstadoInstancia tEI  WHERE tEI.FK_IdAsignadoUsuario = ' + idUsuario)
  });
}

exports.GetPendingEstadosInstanciaByIdEstadoInstancia = function (idEstadoInstancia) {
  console.log('traEstadoInstancia/GetPendingEstadosInstanciaByIdEstadoInstancia');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT COUNT (DISTINCT ei.IdEstadoInstancia) PendingEstadosInstanciaCount " +
      "FROM traTramite tr " +
      "INNER JOIN traInstanciaTramite tri ON tr.IdTramite = tri.FK_IdTramite " +
      "INNER JOIN traEstadoDefinicion ed ON tr.IdTramite = ed.FK_IdTramite " +
      "INNER JOIN traEstadoInstancia ei ON ed.IdEstado = ei.IdEstadoDefinicion and ei.IdInstanciaTramite = tri.IdInstanciaTramite " +
      "INNER JOIN traGrupoAsignado g ON ed.FK_IdAsignadoGrupo = g.IdGrupo " +
      "LEFT JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = ei.FK_IdAsignadoUsuario " +
      "INNER JOIN traTipoPrioridad trap ON ed.FK_EstadoPrioridad = trap.IdTipoPrioridad " +
      "INNER JOIN traEstadoEstado tEE ON ei.EstadoEstado = tEE.IdEstadoEstado " +
      "INNER JOIN traTipoEstado tTE ON tTE.IdTipoEstado = ED.TipoEstado " +
      "WHERE tri.IdInstanciaTramite= " + idEstadoInstancia + " " +
      "AND ei.EstadoEstado NOT IN (2)")
  });
}

/*
SELECT DISTINCT
	UA.IdUsuario IdUsuarioAsignado,
	UA.Username, 
	UA.Email,
	GA.NombreGrupo,
	GA.IdGrupo
FROM traUsuarioAsignado UA
INNER JOIN traGrupoUsuarios GU ON GU.IdUsuario = UA.IdUsuario
INNER JOIN traGrupoAsignado GA ON GA.IdGrupo = GU.IdGrupo
INNER JOIN traEstadoDefinicion ED ON ED.FK_IdAsignadoGrupo = GA.IdGrupo
INNER JOIN traEstadoInstancia EI ON EI.IdEstadoDefinicion = ED.IdEstado
WHERE EI.IdEstadoInstancia = 608
*/
exports.GetPossibleAssignationUsuarios = function (idEstadoInstancia) {
  console.log('traEstadoInstancia/GetPossibleAssignationUsuarios');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT DISTINCT " +
      "UA.IdUsuario IdUsuarioAsignado, " +
      "UA.Username,  " +
      "UA.Email, " +
      "GA.NombreGrupo, " +
      "GA.IdGrupo " +
      "FROM traUsuarioAsignado UA " +
      "INNER JOIN traGrupoUsuarios GU ON GU.IdUsuario = UA.IdUsuario " +
      "INNER JOIN traGrupoAsignado GA ON GA.IdGrupo = GU.IdGrupo " +
      "INNER JOIN traEstadoDefinicion ED ON ED.FK_IdAsignadoGrupo = GA.IdGrupo " +
      "INNER JOIN traEstadoInstancia EI ON EI.IdEstadoDefinicion = ED.IdEstado " +
      "WHERE EI.IdEstadoInstancia = " + idEstadoInstancia)
  });
}