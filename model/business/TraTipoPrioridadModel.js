var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.GetAll = function() {
  console.log('TraTipoPrioridad/GetAll');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select * from traTipoPrioridad')
   });

}