var sql = require('mssql');
//var sendmail = require('../../controllers/external/sendMailer.js');
var config = require('../../config/db.json')

// Gets complete TraInstanciaTramite list
exports.GetAll = function () {
  console.log('TraInstanciaTramite/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from traInstanciaTramite')
  });

}

// Gets TraInstanciaTramite by IdTramite
exports.GetByIdInstanciaTramite = function (idInstanciaTramite) {
  console.log('TraInstanciaTramite/GetByIdInstanciaTramite');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from traInstanciaTramite where IdInstanciaTramite = ' + idInstanciaTramite)
  });
}

// Creates a new TraInstanciaTramite
exports.Create = function (traInstanciaTramite) {
  console.log('TraInstanciaTramite/Create');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("INSERT INTO traInstanciaTramite OUTPUT INSERTED.* VALUES (" +
      traInstanciaTramite.IdTramite + "," +
      "'" + traInstanciaTramite.FechaComienzo + "'," +
      "'" + traInstanciaTramite.FechaFin + "'," +
      traInstanciaTramite.Legajo + "," +
      "'" + traInstanciaTramite.Prioridad + "'," +
      0 + ") ")
  });

}

// Creates a update TraInstanciaTramite
exports.Update = function (traInstanciaTramite) {
  console.log('TraInstanciaTramite/Update');

  var sqlUpdateTramite = "DECLARE @IdInstanciaTramiteActivoMax INT ";
  sqlUpdateTramite += "DECLARE @IdInstanciaTramiteActivoAux INT ";
  sqlUpdateTramite += " SET @IdInstanciaTramiteActivoMax = (SELECT MAX(IdInstanciaTramiteActivo) + 1 FROM traInstanciaTramite)";
  sqlUpdateTramite += " SET @IdInstanciaTramiteActivoAux = (SELECT IdInstanciaTramiteActivo FROM traInstanciaTramite WHERE IdInstanciaTramite=" + traInstanciaTramite.IdTramite + ")";
  sqlUpdateTramite += " IF(@IdInstanciaTramiteActivoAux = 0) ";
  sqlUpdateTramite += " BEGIN ";
	sqlUpdateTramite += " UPDATE traInstanciaTramite SET IdInstanciaTramiteActivo=@IdInstanciaTramiteActivoMax OUTPUT INSERTED.FechaComienzo, INSERTED.FechaFin, INSERTED.FK_IdTramite, INSERTED.IdentificadorInteresado, INSERTED.IdInstanciaTramite, INSERTED.Prioridad, INSERTED.IdInstanciaTramiteActivo WHERE IdInstanciaTramite=" + traInstanciaTramite.IdTramite;
  sqlUpdateTramite += " END ";

  var sqlUpdateTramite1 = " UPDATE traInstanciaTramite SET ";
  var updateReal = false;
  if (typeof traInstanciaTramite.FechaComienzo !== 'undefined'){
    sqlUpdateTramite1 += " FechaComienzo=" + "'" + traInstanciaTramite.FechaComienzo + "', ";
    updateReal=true;
  }
  if (typeof traInstanciaTramite.FechaFin !== 'undefined'){
    sqlUpdateTramite1 += " FechaFin=" + "'" + traInstanciaTramite.FechaFin + "', ";
    updateReal=true;
  }
  if (typeof traInstanciaTramite.Legajo !== 'undefined'){
    sqlUpdateTramite1 += " Legajo=" + traInstanciaTramite.Legajo + ", ";
    updateReal=true;
  }
  if (typeof traInstanciaTramite.Prioridad !== 'undefined'){
    sqlUpdateTramite1 += " Prioridad=" + "'" + traInstanciaTramite.Prioridad + "'";
    updateReal=true;
  }

  var ultimo_valor = sqlUpdateTramite1.substring(sqlUpdateTramite.length-2, sqlUpdateTramite.length);
  if (ultimo_valor==', '){
      var sqlUpdateTramite1 = sqlUpdateTramite1.slice(0,-2);
  }
  sqlUpdateTramite1 += " OUTPUT INSERTED.FechaComienzo, INSERTED.FechaFin, INSERTED.FK_IdTramite, INSERTED.IdentificadorInteresado, INSERTED.IdInstanciaTramite, INSERTED.Prioridad, INSERTED.IdInstanciaTramiteActivo WHERE IdInstanciaTramite=" + traInstanciaTramite.IdTramite;

  if (updateReal){
    sqlUpdateTramite += sqlUpdateTramite1;
  }


  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(sqlUpdateTramite)
  });    
}


exports.GetTramiteInstanciaByLegajo = function (legajo, idUsuario) {
  console.log('TraInstanciaTramite/GetTramiteInstanciaByLegajo');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(" SELECT tT.IdTramite, tIT.IdInstanciaTramiteActivo, tT.IdTramite as IdTramiteDef, tT.Nombre, tIT.IdentificadorInteresado, tT.Descripcion, tIT.IdInstanciaTramite, tIT.FechaComienzo, tIT.FechaFin, tEI.EstadoEstado, tED.nombreEstadoParaAlumno, tEI.IdEstadoInstancia, tEI.ValoresEntrada, tEI.ValoresSalida, tED.IdEstado " +
      "FROM traInstanciaTramite tIT " +
      "INNER JOIN traTramite tT ON tIT.FK_IdTramite = tT.IdTramite " +
      "INNER JOIN traEstadoInstancia tEI ON tEI.IdInstanciaTramite = tIT.IdInstanciaTramite  " +
      "INNER JOIN traEstadoDefinicion tED ON tED.IdEstado = tEI.IdEstadoDefinicion " +
      "INNER JOIN traEstadoEstado tEE on tEE.IdEstadoEstado = tEI.EstadoEstado " +
      " WHERE IdentificadorInteresado = '" + legajo + "'" + "AND (tEE.IdEstadoEstado NOT IN (2,6)) " +
      " AND (tIT.IdInstanciaTramiteActivo <> 0) " +
      " AND tEI.IdEstadoInstancia IN (" +
      "SELECT MAX(tEI.IdEstadoInstancia)" +
      "FROM traInstanciaTramite tIT " +
      "INNER JOIN traTramite tT ON tIT.FK_IdTramite = tT.IdTramite " +
      "INNER JOIN traEstadoInstancia tEI ON tEI.IdInstanciaTramite = tIT.IdInstanciaTramite  " +
      "INNER JOIN traEstadoDefinicion tED ON tED.IdEstado = tEI.IdEstadoDefinicion " +
      "INNER JOIN traEstadoEstado tEE on tEE.IdEstadoEstado = tEI.EstadoEstado " +
      " WHERE IdentificadorInteresado = '" + legajo + "'" + "AND (tEE.IdEstadoEstado <> 2)" +
      " group by tIT.IdInstanciaTramite) " +
      " UNION" +
      " SELECT DISTINCT tT.IdTramite, tIT.IdInstanciaTramiteActivo, tT.IdTramite as IdTramiteDef, tT.Nombre, tIT.IdentificadorInteresado, tT.Descripcion, tIT.IdInstanciaTramite, tIT.FechaComienzo, tIT.FechaFin, tEI.EstadoEstado, 'Tramite Finalizado' as nombreEstadoParaAlumno, tEI.IdEstadoInstancia, tEI.ValoresEntrada, tEI.ValoresSalida, tED.IdEstado " +
      "FROM traInstanciaTramite tIT  " +
      "INNER JOIN traTramite tT ON tIT.FK_IdTramite = tT.IdTramite " +
      "INNER JOIN traEstadoInstancia tEI ON tEI.IdInstanciaTramite = tIT.IdInstanciaTramite  " +
      "INNER JOIN traEstadoDefinicion tED ON tED.IdEstado = tEI.IdEstadoDefinicion " +
      "INNER JOIN traEstadoEstado tEE on tEE.IdEstadoEstado = tEI.EstadoEstado " +

      "cross apply (SELECT tIT1.IdInstanciaTramite,MAX(tEI1.IdEstadoInstancia) maximaEstadoInstancia " +
      "FROM traInstanciaTramite tIT1 " +
      "INNER JOIN traTramite tT1 ON tIT1.FK_IdTramite = tT1.IdTramite " +
      "INNER JOIN traEstadoInstancia tEI1 ON tEI1.IdInstanciaTramite = tIT1.IdInstanciaTramite " +
      "where tIT1.IdInstanciaTramite = tIT.IdInstanciaTramite " +
      "GROUP BY tIT1.IdInstanciaTramite) as maxEstadoInstancia " +

      " WHERE IdentificadorInteresado = '" + legajo + "'" + "AND (tEE.IdEstadoEstado NOT IN (6)) " +
      " AND (tIT.IdInstanciaTramiteActivo <> 0) " +
      " AND maxEstadoInstancia.maximaEstadoInstancia = tEI.IdEstadoInstancia AND tIT.IdInstanciaTramite NOT IN (" +
      "SELECT DISTINCT tIT.IdInstanciaTramite " +
      "FROM traInstanciaTramite tIT " +
      "INNER JOIN traTramite tT ON tIT.FK_IdTramite = tT.IdTramite " +
      "INNER JOIN traEstadoInstancia tEI ON tEI.IdInstanciaTramite = tIT.IdInstanciaTramite  " +
      "INNER JOIN traEstadoDefinicion tED ON tED.IdEstado = tEI.IdEstadoDefinicion " +
      "INNER JOIN traEstadoEstado tEE on tEE.IdEstadoEstado = tEI.EstadoEstado " +
      " WHERE IdentificadorInteresado = '" + legajo + "'" + "AND (tEE.IdEstadoEstado <> 2))  order by tIT.IdInstanciaTramiteActivo DESC"
    )
  });
}

exports.GetEdificioByInstanciaTramite = function (IdTramite) {
  console.log('traInstanciaTramite/GetEdificioByInstanciaTramite');

  var sqlUpdateTramite = " select TOP 1 ValoresSalida from traEstadoInstancia " +
                         " where IdTramite=" + IdTramite;
    return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(sqlUpdateTramite)
  });    
}

exports.GetDuracionEstimadoTramite = function (IdTramite) {
  console.log('traInstanciaTramite/GetDuracionEstimadoTramite');

  var sqlUpdateTramite = " select SUM(d.DuracionLimiteTarea) as DuracionLimiteTarea from traTramite T " +
                         " inner join traEstadoDefinicion d on T.IdTramite = d.FK_IdTramite " +
                         " where T.IdTramite=" + IdTramite;
    return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query(sqlUpdateTramite)
  });    
}



