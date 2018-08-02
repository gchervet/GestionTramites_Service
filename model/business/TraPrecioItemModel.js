var sql = require('mssql');
var config = require('../../config/db.json')

// Get a precioItem list
exports.GetByPrecioItemByIdPantalla = function(idPrecioLista, idPantalla) {
  console.log('TraPrecioItem/GetByPrecioItemByIdPantalla');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('exec sp_tra_getPantallaItems ' + idPrecioLista + ', ' + idPantalla)
  });
}