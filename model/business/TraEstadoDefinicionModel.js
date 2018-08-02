var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.getByIdEstado = function(idEstado) {
  console.log('TraEstadoDefinicion/getByIdEstado');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('SELECT ed.*, te.Nombre as TipoEstadoNombre' +
     ' FROM traEstadoDefinicion AS ed' +
       ' INNER JOIN traTipoEstado AS te ON te.IdTipoEstado = ed.TipoEstado' +
     ' WHERE ed.idEstado = ' + idEstado)
   });

}

// Get next EstadoDefinicion from a particular EstadoDefinicion
exports.getNextEstadoByIdEstado = function (idEstado) {
  console.log('TraEstadoDefinicion/getNextEstadoByIdEstado');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('DECLARE @idEstadoSiguiente varchar(50);' +
    ' SELECT @idEstadoSiguiente = FK_IdEstadoSiguiente FROM traEstadoDefinicion WHERE idEstado = ' + idEstado +
    ' IF (@idEstadoSiguiente IS NOT NULL)' +
      ' BEGIN' +
        ' SELECT ed.*, te.Nombre as TipoEstadoNombre' +
          ' FROM traEstadoDefinicion AS ed' +
          ' WHERE ed.idEstado = @idEstadoSiguiente' +
          ' INNER JOIN traTipoEstado AS te ON te.IdTipoEstado = ed.TipoEstado' +
      ' END')
  });

}

exports.GetEstadoInicialByIdTramite = function(idTramite) {
  console.log('TraEstadoDefinicion/GetEstadoInicialByIdTramite');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('SELECT	tED.*,' +
                                ' tP.Nombre NombrePantalla, tGA.NombreGrupo, tTE.Nombre NombreTipoEstado' +
                                ' FROM traEstadoDefinicion tED' +
                                  ' LEFT JOIN traEstadosSiguientes tES ON tES.FK_IdEstadoSiguiente = tED.FK_IdTramite' +
                                  ' LEFT JOIN traPantalla tP ON tP.IdPantalla = tED.IdPantalla' +
                                  ' LEFT JOIN traTipoEstado tTE ON tTE.IdTipoEstado = tED.TipoEstado' +
                                  ' LEFT JOIN traGrupoAsignado tGA ON tGA.IdGrupo = tED.FK_IdAsignadoGrupo' +
                              ' WHERE	tED.FK_IdTramite = ' + idTramite +
                              ' AND		tED.IdEstado NOT IN (SELECT FK_IdEstadoSiguiente FROM traEstadosSiguientes)')
  });
}

/*

SELECT DISTINCT tES.FK_IdEstadoSiguiente, tES.Condicion, tED.IdPantalla, tED.FK_IdTramite, tP.Nombre NombrePantalla, tGA.IdGrupo, tGA.NombreGrupo
FROM traEstadosSiguientes tES
LEFT JOIN traEstadoDefinicion tED ON tED.IdEstado = tES.FK_IdEstadoSiguiente
LEFT JOIN traPantalla tP ON tP.IdPantalla = tED.IdPantalla 
LEFT JOIN traGrupoAsignado tGA ON tGA.IdGrupo = tED.FK_IdAsignadoGrupo
WHERE tES.FK_IdEstadoActual = 1
*/
exports.GetNextEstadosByIdEstadoActual = function(idEstadoActual) {
  console.log('TraEstadoDefinicion/GetNextEstadosByIdEstadoActual');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('SELECT DISTINCT tES.FK_IdEstadoSiguiente, tES.Condicion, tED.IdPantalla, tED.FK_IdTramite, tP.Nombre NombrePantalla, tGA.IdGrupo, tGA.NombreGrupo ' +
                                ' FROM traEstadosSiguientes tES' +
                                ' LEFT JOIN traEstadoDefinicion tED ON tED.IdEstado = tES.FK_IdEstadoSiguiente ' +
                                ' LEFT JOIN traPantalla tP ON tP.IdPantalla = tED.IdPantalla ' +
                                ' LEFT JOIN traGrupoAsignado tGA ON tGA.IdGrupo = tED.FK_IdAsignadoGrupo ' +
                                ' WHERE tES.FK_IdEstadoActual = ' + idEstadoActual)
});
}