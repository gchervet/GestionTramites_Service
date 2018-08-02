var sql = require('mssql');
var config = require('../../config/db.json')

exports.getMateriasAprobadasByLegajo = function(legajo) {
  console.log('UniMateria/getMateriasAprobadasByLegajo');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('EXEC dbo.sp_tra_getMateriasAprobadasByLegajo ' + legajo)
  });
}
