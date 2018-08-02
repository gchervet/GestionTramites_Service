var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetSaldoByLegajo = function(legajo) {
  console.log('UniCtaCteEstado/GetSaldoByLegajo');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select Deuda, InscrcripcionAFavor from UniCtaCteEstado where legajo =' + legajo);
  });
}