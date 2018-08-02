var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.GetByIdCondiciones = function(idCondiciones) {
  console.log('TraCondiciones/GetByIdCondiciones');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select * from TraCondiciones where IdCondiciones = ' + idCondiciones)
   });

}