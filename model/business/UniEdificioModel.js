var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetAll = function() {
  console.log('UniEdificio/GetAll');
    return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query('select * from uniEdificios')
    });

}

exports.GetEdificioByCodins = function(codins) {
  console.log('UniEdificio/GetEdificioByCodins');
    return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query("select * from uniEdificios where codins = '" + codins + "'")
    });
}

exports.GetEdificioConstancia = function () {
  console.log('UniEdificio/GetEdificioConstancia');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT * FROM uniEdificios where codins in (00,31,30,25,23,21,10,03)")
  });
}

exports.GetEdificioLibretaUniversitaria = function () {
  console.log('UniEdificio/GetEdificioLibretaUniversitaria');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query("SELECT * FROM uniEdificios where codins in (00,31,30)")
  });
}
