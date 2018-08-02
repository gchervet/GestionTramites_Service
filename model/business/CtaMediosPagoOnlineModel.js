var sql = require('mssql');
var config = require('../../config/db.json')

exports.GetAll = function (legProvi) {
  console.log('CtaMediosPagoOnline/GetAll');
  return new sql.ConnectionPool(config).connect().then(pool => {
      return pool.request().query('SELECT ' + 
                                  'Codigo, ' + 
                                  'Nombre, ' + 
                                  'FinancieraPropiaId, ' + 
                                  'Habilitado, ' + 
                                  'TipoTransaccion, ' + 
                                  'IngresaNumeroPago, ' + 
                                  'TipoNumeroPago, ' + 
                                  'TipoTransaccion1Cuota ' + 
                                  'FROM CtaMediosPagoOnline	WHERE HABILITADO = 1')
    });
  }