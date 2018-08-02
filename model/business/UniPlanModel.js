var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetAll = function() {
  console.log('UniPlan/GetAll');
    return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query('select * from uniPlanes')
    });

}

exports.GetPlanByCodigoCarrera = function(codcar){
  console.log('UniPlan/GetPlanByCodigoCarrera');
    return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query("EXEC sp_get_PlanesMateriasDetalladasByCodigoPlan '" + codcar + "'")
    });
}