var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetTipoUsuarioByUsername = function(username) {
  console.log('TraUsuarioAsignado/GetTipoUsuarioByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT tUA.IdUsuario, tTU.IdTipoUsuario, tTU.Descripcion TipoUsuarioDescripcion FROM traTipoUsuario tTU " +
                                "INNER JOIN traUsuarioAsignado tUA ON tUA.TipoUsuario = tTU.IdTipoUsuario AND tUA.Username = '" + username +"'")
  });
}


/* Se expone este servicio para el usuario que se esta logueando */
exports.GetUsuarioInfoByUsername = function(username) {
  console.log('TraUsuarioAsignado/GetUsuarioInfoByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT tGU.IdGrupo, tGA.NombreGrupo, tUA.Email, tUA.IdUsuario, tTU.IdTipoUsuario, tTU.Descripcion TipoUsuarioDescripcion  " +
                                "FROM traUsuarioAsignado tUA " +
                                "LEFT JOIN traTipoUsuario tTU ON tUA.TipoUsuario = tTU.IdTipoUsuario " +
                                "LEFT JOIN traGrupoUsuarios tGU ON tGU.IdUsuario = tUA.IdUsuario " +
                                "LEFT JOIN traGrupoAsignado tGA ON tGA.IdGrupo = tGU.IdUsuario  " +
                                "WHERE tUA.Username = '" + username +"'")
  });
}