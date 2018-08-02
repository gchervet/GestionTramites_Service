var sql = require('mssql');
var config = require('../../config/db.json')

// Get a particular EstadoDefinicion
exports.GetByIdArchivoInstanciaTramiteEstado = function(idArchivoInstanciaTramiteEstado) {
  console.log('traArchivoInstanciaTramiteEstado/GetByIdArchivoInstanciaTramiteEstado');
   return new sql.ConnectionPool(config).connect().then(pool => {
     return pool.request().query('select * from traArchivoInstanciaTramiteEstado where IdArchivoInstanciaTramiteEstado = ' + idArchivoInstanciaTramiteEstado)
   });
}

exports.GetByIdEstadoInstancia = function(idEstadoInstancia) {
  console.log('traArchivoInstanciaTramiteEstado/GetByIdEstadoInstancia');
  return new sql.ConnectionPool(config).connect().then(pool => {
    return pool.request().query('select * from traArchivoInstanciaTramiteEstado where IdEstadoInstancia = ' + idEstadoInstancia)
  });
}