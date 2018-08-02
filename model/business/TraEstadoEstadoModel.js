var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.GetByIdEstadoEstado = function(idEstadoEstado) {
  console.log('TraEstadoEstado/GetByIdEstadoEstado');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select * from traEstadoEstado where idEstadoEstado = ' + idEstadoEstado)
   });

}

exports.GetAll = function() {
  console.log('TraEstadoEstado/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('SELECT * FROM traEstadoEstado')
  });

}