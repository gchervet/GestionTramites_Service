var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.GetByIdGrupo = function(idGrupo) {
  console.log('TraGrupoAsignado/GetByIdGrupo');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select * from traGrupoAsignado where IdGrupo = ' + idGrupo)
   });

}