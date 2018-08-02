var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.GetUsuariosByIdGrupo = function(idGrupo) {
  console.log('TraGrupoUsuario/GetUsuariosByIdGrupo');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query("SELECT tGU.IdUsuario, tUA.Username, tUA.Email from TraGrupoUsuarios tGU " + 
     "INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario " +
     "WHERE IdGrupo = " + idGrupo)
   });

}

exports.getGruposByIdUsuario = function(idUsuario) {
  console.log('TraInstanciaTramite/getGruposByIdUsuario');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select IdGrupo from TraGrupoUsuarios where IdUsuario = ' + idUsuario)
  });
}

exports.GetGruposByUsername = function(username) {
  console.log('TraGrupoUsuario/GetGruposByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT tGU.IdGrupo, tGU.IdUsuario FROM TraGrupoUsuarios tGU " +
                                "INNER JOIN traUsuarioAsignado tUA ON tUA.IdUsuario = tGU.IdUsuario " +
                                "WHERE tUA.Username =  '" + username + "'")
  });
}


exports.GetGrupoAsignadoByUsername = function(username) {
  console.log('TraGrupoUsuario/GetGrupoAsignadoByUsername');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT tGA.IdGrupo, tGA.NombreGrupo, tUA.IdUsuario, tUA.Username, tUA.Email FROM traGrupoAsignado tGA " + 
    "INNER JOIN traGrupoUsuarios tGU on tGA.IdGrupo = tGU.IdGrupo " +
    "INNER JOIN traUsuarioAsignado tUA on tUA.IdUsuario = tGU.IdUsuario " +
  "WHERE tUA.Username = '" + username + "' OR tUA.Email = '" + username + "'")
  });

}

exports.AddAlumnoToGrupoAlumnos = function(idUsuario) {
  console.log('TraGrupoUsuario/AddAlumnoToGrupoAlumnos');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("INSER INTO [traGrupoUsuarios] VALUES (" + idUsuario + ",4)")
  });

}