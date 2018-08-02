var sql = require('mssql');
var config = require('../../config/db.json')

exports.getAlumnoLibretaUniByLegajoProvi = function (legProvi) {
  console.log('traAlumnoLibretaUni/getAlumnoLibretaUniByLegajoProvi');
  return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query('select Legprovi,'+
                                  ' FotocopiaDniEstado,'+
                                  ' FotosCarnetEstado,'+
                                  ' RetiroCodins,'+
                                  ' TituloSecundarioEstado'+
                                  '   from traAlumnoLibretaUni'+
                                  ' where Legprovi = ' + legProvi)
    });
  }